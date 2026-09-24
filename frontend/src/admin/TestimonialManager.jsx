import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, Switch, message, Popconfirm, Rate } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { testimonialService } from '../services';

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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

  const handleSave = async (values) => {
    try {
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
      render: (p) => <span style={{ color: p ? '#4CAF3D' : '#E8453C', fontWeight: 700 }}>{p ? 'YES' : 'NO'}</span>,
    },
    {
      title: 'Actions',
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingItem(r);
              form.setFieldsValue(r);
              setModalOpen(true);
            }}
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>⭐ Parent & Partner Testimonials</h2>
          <p style={{ color: '#777', margin: '2px 0 0' }}>Manage customer reviews and carousel endorsements.</p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ background: '#F5821F' }}
          onClick={() => {
            setEditingItem(null);
            form.resetFields();
            form.setFieldsValue({ rating: 5, isPublished: true });
            setModalOpen(true);
          }}
        >
          Add Testimonial
        </Button>
      </div>

      <Table columns={columns} dataSource={testimonials} rowKey="id" loading={loading} />

      <Modal
        title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="name" label="Parent or Partner Name" rules={[{ required: true }]}>
            <Input placeholder="e.g. Pooja Patel" />
          </Form.Item>

          <Form.Item name="role" label="Role / Title" rules={[{ required: true }]}>
            <Input placeholder="e.g. Parent of Aarav (UKG)" />
          </Form.Item>

          <Form.Item name="rating" label="Star Rating (1-5)" rules={[{ required: true }]}>
            <InputNumber min={1} max={5} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="quote" label="Testimonial Review" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Write the parent's feedback..." />
          </Form.Item>

          <Form.Item name="isPublished" label="Publish on Website" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={{ background: '#F5821F' }}>
            {editingItem ? 'Update Testimonial' : 'Save Testimonial'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
