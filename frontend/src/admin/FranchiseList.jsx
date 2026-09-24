import React, { useState, useEffect, useCallback } from 'react';
import { Table, Tag, Select, Button, Space, Input, Modal, Form, message, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { franchiseService } from '../services';

const { Option } = Select;

export default function FranchiseList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        status: statusFilter || undefined,
        search: searchText || undefined,
      };
      const res = await franchiseService.getAll(params);
      if (res.success && res.data) {
        setData(res.data.enquiries || []);
        setPagination({
          current: res.data.currentPage,
          pageSize: limit,
          total: res.data.totalItems,
        });
      }
    } catch (err) {
      message.error(err.message || 'Could not load franchise leads');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchText]);

  useEffect(() => {
    fetchData(1, pagination.pageSize);
  }, [fetchData, pagination.pageSize]);

  const handleStatusUpdate = async (values) => {
    try {
      const res = await franchiseService.updateStatus(selectedEnquiry.id, values);
      if (res.success) {
        message.success('Franchise lead status updated');
        setStatusModalOpen(false);
        fetchData(pagination.current, pagination.pageSize);
      }
    } catch (err) {
      message.error(err.message || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await franchiseService.delete(id);
      if (res.success) {
        message.success('Franchise enquiry deleted');
        fetchData(pagination.current, pagination.pageSize);
      }
    } catch (err) {
      message.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: 'Investor Name', dataIndex: 'name', render: (t) => <strong>{t}</strong> },
    {
      title: 'City & State',
      render: (_, r) => (
        <span><EnvironmentOutlined style={{ color: '#4CAF3D' }} /> {r.city}, {r.state}</span>
      ),
    },
    {
      title: 'Contact',
      render: (_, r) => (
        <div style={{ fontSize: '0.85rem' }}>
          <div><PhoneOutlined style={{ color: '#F5821F' }} /> <a href={`tel:${r.phone}`}>{r.phone}</a></div>
          <div><MailOutlined style={{ color: '#2E9BD6' }} /> {r.email}</div>
        </div>
      ),
    },
    {
      title: 'Capacity & Space',
      render: (_, r) => (
        <div style={{ fontSize: '0.82rem' }}>
          <Tag color="green">{r.investmentCapacity || 'Flexible'}</Tag>
          <div style={{ color: '#777', marginTop: 2 }}>{r.spaceAvailableSqft || 'Space TBD'}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (s) => (
        <Tag color={s === 'new' ? 'red' : s === 'in_review' ? 'blue' : s === 'approved' ? 'green' : 'default'}>
          {s?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (d) => new Date(d).toLocaleDateString(),
    },
    {
      title: 'Actions',
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedEnquiry(r);
              form.setFieldsValue({ status: r.status, notes: r.notes });
              setStatusModalOpen(true);
            }}
          >
            Review
          </Button>

          <Popconfirm title="Delete partner enquiry?" onConfirm={() => handleDelete(r.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#222' }}>
            🏢 Franchise Partner Leads
          </h2>
          <p style={{ color: '#777', margin: '2px 0 0' }}>Review investor inquiries, territory feasibility, and investment budgets.</p>
        </div>

        <Space wrap>
          <Input
            placeholder="Search name/city/phone"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220, borderRadius: 8 }}
          />

          <Select
            placeholder="Filter Status"
            allowClear
            value={statusFilter || undefined}
            onChange={setStatusFilter}
            style={{ width: 140 }}
          >
            <Option value="new">🔴 NEW</Option>
            <Option value="in_review">🔵 IN REVIEW</Option>
            <Option value="approved">🟢 APPROVED</Option>
            <Option value="closed">⚪ CLOSED</Option>
          </Select>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => fetchData(page, pageSize),
        }}
        scroll={{ x: 850 }}
      />

      <Modal
        title={`Review Franchise Application: ${selectedEnquiry?.name}`}
        open={statusModalOpen}
        onCancel={() => setStatusModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleStatusUpdate}>
          <Form.Item name="status" label="Partner Lead Status" rules={[{ required: true }]}>
            <Select size="large">
              <Option value="new">🔴 NEW INQUIRY</Option>
              <Option value="in_review">🔵 FEASIBILITY & REVIEW</Option>
              <Option value="approved">🟢 APPROVED / AGREEMENT SIGNED</Option>
              <Option value="closed">⚪ CLOSED / DECLINED</Option>
            </Select>
          </Form.Item>

          <Form.Item name="notes" label="Director / Review Notes">
            <Input.TextArea rows={4} placeholder="Add territory notes, meeting discussion, space evaluation..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={{ background: '#F5821F' }}>
            Save Partner Status
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
