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
import KpiCard from '../components/common/KpiCard';

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
          Dashboard Overview
        </h2>
       
      </div>

      {/* KPI Cards (4 Cards Per Row on Desktop) */}
      <Row gutter={[20, 20]} style={{ marginBottom: 36 }}>
        <Col xs={24} sm={12} lg={6}>
          <KpiCard
            title="Total Admissions"
            value={stats.totalAdmissions}
            icon={<UsergroupAddOutlined />}
            color="#F7941D"
          
         
            loading={loading}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <KpiCard
            title="New Action Leads"
            value={stats.newAdmissions}
            icon={<RiseOutlined />}
            color="#E8453C"
            badge={stats.newAdmissions > 0 ? `${stats.newAdmissions} New` : undefined}
          
            loading={loading}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <KpiCard
            title="Franchise Leads"
            value={stats.totalFranchise}
            icon={<ShopOutlined />}
            color="#0072BC"
           
            loading={loading}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <KpiCard
            title="Lab Programs"
            value={7}
            icon={<BookOutlined />}
            color="#39B54A"
           
            loading={loading}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <KpiCard
            title="Store Products"
            value={stats.totalProducts}
            icon={<ShoppingOutlined />}
            color="#FBB040"
           
            loading={loading}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <KpiCard
            title="Kit Orders"
            value={stats.totalOrders}
            icon={<OrderedListOutlined />}
            color="#8B5CF6"
            badge={stats.newOrders > 0 ? `${stats.newOrders} New` : undefined}
           
            loading={loading}
          />
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
