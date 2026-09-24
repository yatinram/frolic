import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { blogService } from '../services';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await blogService.getAll({ all: 'true' });
      if (res.success) {
        setBlogs(res.data || []);
      }
    } catch (err) {
      message.error('Could not load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = async (values) => {
    try {
      if (editingBlog) {
        await blogService.update(editingBlog.id, values);
        message.success('Article updated successfully');
      } else {
        await blogService.create(values);
        message.success('Article published successfully');
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      message.error(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.delete(id);
      message.success('Article deleted');
      fetchBlogs();
    } catch (err) {
      message.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { title: 'Article Title', dataIndex: 'title', render: (t) => <strong>{t}</strong> },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Read Time', dataIndex: 'readTime' },
    { title: 'Date', dataIndex: 'publishedAt', render: (d) => new Date(d).toLocaleDateString() },
    {
      title: 'Action',
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingBlog(r);
              form.setFieldsValue(r);
              setModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm title="Delete article?" onConfirm={() => handleDelete(r.id)}>
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>📝 Education Articles & SEO Posts</h2>
          <p style={{ color: '#777', margin: '2px 0 0' }}>Publish parent guides, learning lab articles, and announcements.</p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ background: '#F5821F' }}
          onClick={() => {
            setEditingBlog(null);
            form.resetFields();
            form.setFieldsValue({ readTime: '4 min read', category: 'Pedagogy' });
            setModalOpen(true);
          }}
        >
          Write New Article
        </Button>
      </div>

      <Table columns={columns} dataSource={blogs} rowKey="id" loading={loading} />

      <Modal
        title={editingBlog ? 'Edit Article' : 'Write New Article'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="title" label="Article Title" rules={[{ required: true }]}>
            <Input placeholder="e.g. Why Phonics Outperforms Rote Learning" />
          </Form.Item>

          <Form.Item name="slug" label="URL Slug" rules={[{ required: true }]}>
            <Input placeholder="e.g. why-phonics-outperforms-rote-learning" />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Pedagogy">Pedagogy</Select.Option>
              <Select.Option value="Parenting Guide">Parenting Guide</Select.Option>
              <Select.Option value="Cognitive Science">Cognitive Science</Select.Option>
              <Select.Option value="Announcements">Announcements</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="summary" label="Brief Summary" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="content" label="Full Article HTML / Markdown" rules={[{ required: true }]}>
            <Input.TextArea rows={6} placeholder="<p>Write your detailed article content here...</p>" />
          </Form.Item>

          <Form.Item name="coverImage" label="Cover Image URL">
            <Input placeholder="https://images.unsplash.com/..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={{ background: '#F5821F' }}>
            {editingBlog ? 'Update Article' : 'Publish Article'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
