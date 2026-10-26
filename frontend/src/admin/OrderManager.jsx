import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
  Statistic,
  Typography,
} from 'antd';
import {
  OrderedListOutlined,
  ReloadOutlined,
  SearchOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CarOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { orderService } from '../services';

const { Title, Text } = Typography;
const { TextArea } = Input;

const STATUS_CONFIG = {
  new: { label: 'New / Pending', color: 'orange', icon: <ClockCircleOutlined /> },
  contacted: { label: 'Contacted', color: 'blue', icon: <PhoneOutlined /> },
  dispatched: { label: 'Dispatched', color: 'purple', icon: <CarOutlined /> },
  delivered: { label: 'Delivered', color: 'green', icon: <CheckCircleOutlined /> },
  cancelled: { label: 'Cancelled', color: 'red', icon: null },
};

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getAll();
      const data = res?.data || res || [];
      setOrders(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error(err);
      message.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, { status: newStatus });
      message.success(`Order status updated to "${STATUS_CONFIG[newStatus]?.label || newStatus}"`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch {
      message.error('Failed to update status');
    }
  };

  const handleOpenNotesModal = (order) => {
    setEditingOrder(order);
    form.setFieldsValue({
      status: order.status,
      adminNotes: order.adminNotes || '',
    });
    setNotesModalVisible(true);
  };

  const handleSaveNotes = async (values) => {
    try {
      setSubmitting(true);
      await orderService.updateStatus(editingOrder.id, values);
      message.success('Order details updated!');
      setNotesModalVisible(false);
      fetchOrders();
    } catch {
      message.error('Failed to save order details');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await orderService.delete(id);
      message.success('Order record deleted');
      fetchOrders();
    } catch {
      message.error('Failed to delete order');
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      !searchText ||
      o.parentName?.toLowerCase().includes(searchText.toLowerCase()) ||
      o.phone?.includes(searchText) ||
      o.productName?.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    new: orders.filter((o) => o.status === 'new').length,
    contacted: orders.filter((o) => o.status === 'contacted').length,
    dispatched: orders.filter((o) => o.status === 'dispatched' || o.status === 'delivered').length,
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => <Text strong>{id}</Text>,
    },
    {
      title: 'Customer / Parent',
      key: 'customer',
      width: 180,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 800, color: '#0f172a' }}>{record.parentName}</div>
          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <PhoneOutlined style={{ color: '#10b981' }} />
            <a href={`tel:${record.phone}`} style={{ color: '#64748b', fontWeight: 600 }}>
              {record.phone}
            </a>
          </div>
        </div>
      ),
    },
    {
      title: 'Product & Size',
      key: 'product',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 800, color: '#0f172a' }}>{record.productName}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            {record.grade && <Tag color="orange">{record.grade}</Tag>}
            <Tag color="default">Qty: {record.quantity || 1}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: 'Delivery Address',
      dataIndex: 'address',
      key: 'address',
      render: (addr) => (
        <Text style={{ fontSize: '12px', color: '#475569', display: 'block', maxWidth: 220 }}>
          {addr}
        </Text>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 160,
      render: (_, record) => (
        <Select
          value={record.status || 'new'}
          style={{ width: 140 }}
          onChange={(val) => handleUpdateStatus(record.id, val)}
          options={Object.entries(STATUS_CONFIG).map(([key, cfg]) => ({
            value: key,
            label: (
              <span style={{ color: cfg.color === 'orange' ? '#d97706' : undefined, fontWeight: 600 }}>
                {cfg.label}
              </span>
            ),
          }))}
        />
      ),
    },
    {
      title: 'Admin Notes',
      key: 'adminNotes',
      render: (_, record) => (
        <div style={{ fontSize: '11px', color: '#64748b', maxWidth: 160 }}>
          {record.adminNotes ? record.adminNotes : <Text type="secondary" italic>No notes</Text>}
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (dt) => (
        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
          {dt ? new Date(dt).toLocaleDateString() : '—'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenNotesModal(record)}
            title="Edit notes / status"
          />
          <Popconfirm
            title="Delete this order?"
            onConfirm={() => handleDeleteOrder(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
           
            Store Orders &amp; Kit Inquiries
          </Title>
          {/* <Text type="secondary">Manage incoming orders, update shipping / delivery stages, and maintain parent contact logs.</Text> */}
        </div>

        <Button icon={<ReloadOutlined />} onClick={fetchOrders}>
          Refresh Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col xs={12} sm={6}>
          <Card bordered={false} style={{ background: '#f8fafc', borderRadius: 14 }}>
            <Statistic title="Total Orders" value={stats.total} prefix={<OrderedListOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false} style={{ background: '#fff7ed', borderRadius: 14 }}>
            <Statistic title="New / Pending" value={stats.new} valueStyle={{ color: '#f7941d' }} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false} style={{ background: '#eff6ff', borderRadius: 14 }}>
            <Statistic title="Contacted" value={stats.contacted} valueStyle={{ color: '#3b82f6' }} prefix={<PhoneOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false} style={{ background: '#f0fdf4', borderRadius: 14 }}>
            <Statistic title="Dispatched/Done" value={stats.dispatched} valueStyle={{ color: '#10b981' }} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card bodyStyle={{ padding: '14px 20px' }} style={{ marginBottom: 20, borderRadius: 14 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Search by customer name, phone, product..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'All Order Statuses' },
                ...Object.entries(STATUS_CONFIG).map(([k, v]) => ({
                  value: k,
                  label: v.label,
                })),
              ]}
            />
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Text type="secondary" style={{ fontWeight: 600 }}>
              Showing {filteredOrders.length} of {orders.length} orders
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Orders Table */}
      <Table
        dataSource={filteredOrders}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        bordered
      />

      {/* Edit Notes & Status Modal */}
      <Modal
        title={`Order Details: #ORD-${editingOrder?.id} (${editingOrder?.parentName})`}
        open={notesModalVisible}
        onCancel={() => setNotesModalVisible(false)}
        width={620}
        centered
        destroyOnClose
        styles={{
          body: {
            maxHeight: 'calc(76vh - 80px)',
            overflowY: 'auto',
            padding: '16px 20px 24px 20px',
          },
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '10px 4px' }}>
            <Button onClick={() => setNotesModalVisible(false)} style={{ borderRadius: 10, fontWeight: 600 }}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()} loading={submitting} style={{ background: '#f7941d', borderColor: '#f7941d', borderRadius: 10, fontWeight: 700 }}>
              Save Order Updates
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleSaveNotes} style={{ marginTop: 8 }}>
          <Form.Item name="status" label={<span style={{ fontWeight: 700 }}>Order Status</span>} rules={[{ required: true }]}>
            <Select
              size="large"
              style={{ borderRadius: 10 }}
              options={Object.entries(STATUS_CONFIG).map(([k, v]) => ({
                value: k,
                label: v.label,
              }))}
            />
          </Form.Item>

          <Form.Item name="adminNotes" label={<span style={{ fontWeight: 700 }}>Admin Notes / Tracking Number / Follow-Up Details</span>}>
            <TextArea
              rows={4}
              style={{ borderRadius: 10 }}
              placeholder="e.g. Called parent on 23rd Sept. Confirmed delivery to Sargasan campus. AWB#9876543210."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
