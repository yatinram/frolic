import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
  Popconfirm,
  Rate,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { testimonialService } from '../services';

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await testimonialService.getAll({ all: 'true' });
      if (res.success) {
        setTestimonials(res.data || []);
      }
    } catch (err) {
      message.error('Could not load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ rating: 5, isPublished: true });
    setModalOpen(true);
  };

  const handleOpenEdit = (record) => {
    setEditingItem(record);
    form.resetFields();
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleSave = async (values) => {
    try {
      setSubmitting(true);
      if (editingItem) {
        await testimonialService.update(editingItem.id, values);
        message.success('Testimonial updated successfully');
      } else {
        await testimonialService.create(values);
        message.success('Testimonial added successfully');
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      message.error(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await testimonialService.delete(id);
      message.success('Testimonial deleted');
      fetchItems();
    } catch (err) {
      message.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', render: (t) => <strong>{t}</strong> },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Rating', dataIndex: 'rating', render: (r) => <Rate disabled defaultValue={r} style={{ fontSize: '0.8rem' }} /> },
    { title: 'Quote', dataIndex: 'quote', ellipsis: true },
    {
      title: 'Published',
      dataIndex: 'isPublished',
      width: 110,
      render: (p) => <span style={{ color: p ? '#4CAF3D' : '#E8453C', fontWeight: 700 }}>{p ? 'YES' : 'NO'}</span>,
    },
    {
      title: 'Actions',
      width: 120,
      align: 'center',
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(r)}
          >
            Edit
          </Button>
          <Popconfirm title="Delete testimonial?" onConfirm={() => handleDelete(r.id)}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
            <StarOutlined style={{ marginRight: 8, color: '#F5821F' }} />
            Parent &amp; Partner Testimonials
          </h2>
          <p style={{ color: '#777', margin: '2px 0 0' }}>Manage customer reviews and carousel endorsements.</p>
        </div>

        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchItems}>Refresh</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ background: '#F5821F', borderColor: '#F5821F', borderRadius: 10, fontWeight: 700 }}
            onClick={handleOpenAdd}
          >
            Add Testimonial
          </Button>
        </Space>
      </div>

      <Table columns={columns} dataSource={testimonials} rowKey="id" loading={loading} />

      {/* ── Fixed-Size Scrollable Testimonial Modal ── */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#FFF7EE', color: '#F5821F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <StarOutlined style={{ fontSize: 18 }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0F172A' }}>
              {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
            </span>
          </div>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 4px' }}>
            <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
              * Reviews display on home page slider
            </span>
            <Space>
              <Button onClick={() => setModalOpen(false)} style={{ borderRadius: 10, fontWeight: 600 }}>
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={submitting}
                style={{ background: '#F5821F', borderColor: '#F5821F', borderRadius: 10, fontWeight: 700 }}
              >
                {editingItem ? 'Update Testimonial' : 'Save Testimonial'}
              </Button>
            </Space>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 8 }}>
          <Form.Item
            name="name"
            label={<span style={{ fontWeight: 700 }}>Parent or Partner Name</span>}
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="e.g. Pooja Patel" size="large" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="role"
            label={<span style={{ fontWeight: 700 }}>Role / Title</span>}
            rules={[{ required: true, message: 'Please enter role or child details' }]}
          >
            <Input placeholder="e.g. Parent of Aarav (UKG)" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="rating"
            label={<span style={{ fontWeight: 700 }}>Star Rating (1-5)</span>}
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={5} style={{ width: '100%', borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="quote"
            label={<span style={{ fontWeight: 700 }}>Testimonial Review</span>}
            rules={[{ required: true, message: 'Please write testimonial quote' }]}
          >
            <Input.TextArea rows={4} placeholder="Write the parent's feedback..." style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="isPublished"
            label={<span style={{ fontWeight: 700 }}>Publish on Website</span>}
            valuePropName="checked"
          >
            <Switch defaultChecked />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
