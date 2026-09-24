import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Tag } from 'antd';
import {
  UsergroupAddOutlined,
  ShopOutlined,
  BookOutlined,
  StarOutlined,
  RiseOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { admissionService, franchiseService, productService, orderService } from '../services';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalAdmissions: 0,
    newAdmissions: 0,
    totalFranchise: 0,
    newFranchise: 0,
    totalProducts: 0,
    totalOrders: 0,
    newOrders: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [admRes, franRes, prodRes, ordRes] = await Promise.allSettled([
          admissionService.getAll({ limit: 5 }),
          franchiseService.getAll({ limit: 5 }),
          productService.getAll({ activeOnly: 'false' }),
          orderService.getAll(),
        ]);

        if (admRes.status === 'fulfilled' && admRes.value?.success && admRes.value?.data) {
          setRecentAdmissions(admRes.value.data.admissions || []);
          const total = admRes.value.data.totalItems || 0;
          const newCount = (admRes.value.data.admissions || []).filter(a => a.status === 'new').length;
          setStats((prev) => ({ ...prev, totalAdmissions: total, newAdmissions: newCount }));
        }

        if (franRes.status === 'fulfilled' && franRes.value?.success && franRes.value?.data) {
          const totalF = franRes.value.data.totalItems || 0;
          const newF = (franRes.value.data.enquiries || []).filter(f => f.status === 'new').length;
          setStats((prev) => ({ ...prev, totalFranchise: totalF, newFranchise: newF }));
        }

        if (prodRes.status === 'fulfilled') {
          const prods = prodRes.value?.data || prodRes.value || [];
          const list = Array.isArray(prods) ? prods : prods?.data || [];
          setStats((prev) => ({ ...prev, totalProducts: list.length }));
        }

        if (ordRes.status === 'fulfilled') {
          const ords = ordRes.value?.data || ordRes.value || [];
          const list = Array.isArray(ords) ? ords : ords?.data || [];
          const newOrd = list.filter(o => o.status === 'new').length;
          setStats((prev) => ({ ...prev, totalOrders: list.length, newOrders: newOrd }));
        }
      } catch (err) {
        // Fallback for demo
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const columns = [
    { title: "Child's Name", dataIndex: 'childName', key: 'childName', render: (t) => <strong>{t}</strong> },
    { title: 'Parent', dataIndex: 'parentName', key: 'parentName' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', render: (p) => <a href={`tel:${p}`}>{p}</a> },
    { title: 'Program', dataIndex: 'program', key: 'program', render: (p) => <Tag color="orange">{p}</Tag> },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s) => (
        <Tag color={s === 'new' ? 'red' : s === 'contacted' ? 'blue' : s === 'enrolled' ? 'green' : 'default'}>
          {s?.toUpperCase()}
        </Tag>
      ),
    },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (d) => new Date(d).toLocaleDateString() },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#222222', margin: 0 }}>
          📊 Enterprise Overview & Lead Metrics
        </h2>
        <p style={{ color: '#777777', margin: '4px 0 0' }}>
          Real-time summary of admissions, franchise inquiries, and content modules.
        </p>
      </div>

      {/* KPI Cards */}
      <Row gutter={[20, 20]} style={{ marginBottom: 36 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 18, borderLeft: '5px solid #F5821F', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <Statistic
              title={<span style={{ fontWeight: 700 }}>Total Admission Enquiries</span>}
              value={stats.totalAdmissions}
              prefix={<UsergroupAddOutlined style={{ color: '#F5821F' }} />}
            />
            <div style={{ marginTop: 8, fontSize: '0.82rem', color: '#888' }}>
              <Link to={ROUTES.ADMIN_ADMISSIONS} style={{ color: '#F5821F', fontWeight: 700 }}>
                Manage Enquiries →
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 18, borderLeft: '5px solid #E8453C', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <Statistic
              title={<span style={{ fontWeight: 700 }}>New Actionable Leads</span>}
              value={stats.newAdmissions}
              prefix={<RiseOutlined style={{ color: '#E8453C' }} />}
              valueStyle={{ color: '#E8453C' }}
            />
            <div style={{ marginTop: 8, fontSize: '0.82rem', color: '#E8453C', fontWeight: 700 }}>
              Needs phone contact
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 18, borderLeft: '5px solid #2E9BD6', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <Statistic
              title={<span style={{ fontWeight: 700 }}>Franchise Applications</span>}
              value={stats.totalFranchise}
              prefix={<ShopOutlined style={{ color: '#2E9BD6' }} />}
            />
            <div style={{ marginTop: 8, fontSize: '0.82rem', color: '#888' }}>
              <Link to={ROUTES.ADMIN_FRANCHISE} style={{ color: '#2E9BD6', fontWeight: 700 }}>
                View Investor Leads →
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 18, borderLeft: '5px solid #4CAF3D', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <Statistic
              title={<span style={{ fontWeight: 700 }}>Active Lab Programs</span>}
              value={7}
              prefix={<BookOutlined style={{ color: '#4CAF3D' }} />}
              valueStyle={{ color: '#4CAF3D' }}
            />
            <div style={{ marginTop: 8, fontSize: '0.82rem', color: '#888' }}>
              <Link to={ROUTES.ADMIN_PROGRAMS} style={{ color: '#4CAF3D', fontWeight: 700 }}>
                Curriculum Manager →
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 18, borderLeft: '5px solid #F7941D', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <Statistic
              title={<span style={{ fontWeight: 700 }}>Store Products & Kits</span>}
              value={stats.totalProducts}
              prefix={<ShoppingOutlined style={{ color: '#F7941D' }} />}
              valueStyle={{ color: '#F7941D' }}
            />
            <div style={{ marginTop: 8, fontSize: '0.82rem', color: '#888' }}>
              <Link to={ROUTES.ADMIN_PRODUCTS} style={{ color: '#F7941D', fontWeight: 700 }}>
                Manage Products & Stock →
              </Link>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 18, borderLeft: '5px solid #8B5CF6', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <Statistic
              title={<span style={{ fontWeight: 700 }}>Kit Orders & Inquiries</span>}
              value={stats.totalOrders}
              prefix={<OrderedListOutlined style={{ color: '#8B5CF6' }} />}
              valueStyle={{ color: '#8B5CF6' }}
            />
            <div style={{ marginTop: 8, fontSize: '0.82rem', color: '#888' }}>
              <Link to={ROUTES.ADMIN_ORDERS} style={{ color: '#8B5CF6', fontWeight: 700 }}>
                {stats.newOrders > 0 ? `${stats.newOrders} New Orders →` : 'View Orders →'}
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Admissions Table */}
      <Card
        title={<span style={{ fontWeight: 800, fontSize: '1.15rem' }}>Recent Admission Applications</span>}
        style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
        extra={<Link to={ROUTES.ADMIN_ADMISSIONS} style={{ color: '#F5821F', fontWeight: 700 }}>View All</Link>}
      >
        <Table
          columns={columns}
          dataSource={recentAdmissions}
          rowKey="id"
          pagination={false}
          loading={loading}
        />
      </Card>
    </div>
  );
}
