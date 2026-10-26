import React, { useState, useEffect, useCallback } from 'react';
import { Table, Tag, Select, Button, Space, Input, Modal, Form, message, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { admissionService } from '../services';

const { Option } = Select;

export default function AdmissionsList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
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
      const res = await admissionService.getAll(params);
      if (res.success && res.data) {
        setData(res.data.admissions || []);
        setPagination({
          current: res.data.currentPage,
          pageSize: limit,
          total: res.data.totalItems,
        });
      }
    } catch (err) {
      message.error(err.message || 'Could not load admissions');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchText]);

  useEffect(() => {
    fetchData(1, pagination.pageSize);
  }, [fetchData, pagination.pageSize]);

  const handleStatusUpdate = async (values) => {
    try {
      const res = await admissionService.updateStatus(selectedAdmission.id, values);
      if (res.success) {
        message.success('Admission status updated successfully');
        setStatusModalOpen(false);
        fetchData(pagination.current, pagination.pageSize);
      }
    } catch (err) {
      message.error(err.message || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await admissionService.delete(id);
      if (res.success) {
        message.success('Enquiry deleted');
        fetchData(pagination.current, pagination.pageSize);
      }
    } catch (err) {
      message.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    {
      title: "Child's Name",
      dataIndex: 'childName',
      render: (text, r) => (
        <div>
          <strong style={{ color: '#F5821F' }}>{text}</strong>
          {r.dob && <div style={{ fontSize: '0.75rem', color: '#888' }}>DOB: {r.dob}</div>}
        </div>
      ),
    },
    { title: 'Parent Name', dataIndex: 'parentName' },
    {
      title: 'Contact',
      render: (_, r) => (
        <div style={{ fontSize: '0.85rem' }}>
          <div><PhoneOutlined style={{ color: '#4CAF3D' }} /> <a href={`tel:${r.phone}`}>{r.phone}</a></div>
          {r.email && <div><MailOutlined style={{ color: '#2E9BD6' }} /> {r.email}</div>}
        </div>
      ),
    },
    {
      title: 'Program',
      dataIndex: 'program',
      render: (p) => <Tag color="blue">{p}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (s) => (
        <Tag color={s === 'new' ? 'red' : s === 'contacted' ? 'blue' : s === 'enrolled' ? 'green' : 'default'}>
          {s?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Submitted On',
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
              setSelectedAdmission(r);
              form.setFieldsValue({ status: r.status, notes: r.notes });
              setStatusModalOpen(true);
            }}
          >
           
          </Button>

          <Popconfirm title="Delete enquiry?" onConfirm={() => handleDelete(r.id)}>
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
            Admission Inquiry Management
          </h2>
          {/* <p style={{ color: '#777', margin: '2px 0 0' }}>Manage lead inquiries, update counseling statuses, and review notes.</p> */}
        </div>

        <Space wrap>
          <Input
            placeholder="Search child name "
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 350, borderRadius: 30 }}
          />

          <Select
            placeholder="Filter Status"
            allowClear
            value={statusFilter || undefined}
            onChange={setStatusFilter}
            style={{ width: 140 ,paddingTop: 4, paddingBottom: 4, borderRadius: 30 }}
          >
            <Option value="new">🔴 NEW</Option>
            <Option value="contacted">🔵 CONTACTED</Option>
            <Option value="enrolled">🟢 ENROLLED</Option>
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

      {/* Status Update Modal */}
      <Modal
        title={`Update Status for ${selectedAdmission?.childName}`}
        open={statusModalOpen}
        onCancel={() => setStatusModalOpen(false)}
        width={580}
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
            <Button onClick={() => setStatusModalOpen(false)} style={{ borderRadius: 10, fontWeight: 600 }}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()} style={{ background: '#F5821F', borderColor: '#F5821F', borderRadius: 10, fontWeight: 700 }}>
              Save Status &amp; Notes
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleStatusUpdate} style={{ marginTop: 8 }}>
          <Form.Item name="status" label={<span style={{ fontWeight: 700 }}>Lead Status</span>} rules={[{ required: true }]}>
            <Select size="large" style={{ borderRadius: 10 }}>
              <Option value="new">🔴 NEW LEAD</Option>
              <Option value="contacted">🔵 CONTACTED / COUNSELING</Option>
              <Option value="enrolled">🟢 ENROLLED / PAID</Option>
              <Option value="closed">⚪ CLOSED / REJECTED</Option>
            </Select>
          </Form.Item>

          <Form.Item name="notes" label={<span style={{ fontWeight: 700 }}>Counselor Notes</span>}>
            <Input.TextArea rows={4} style={{ borderRadius: 10 }} placeholder="Add notes on parent discussion, fee quote given, campus visit date..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
