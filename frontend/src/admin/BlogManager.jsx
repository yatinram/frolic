import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Upload,
  Image,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { blogService, uploadService } from '../services';
import { getImageUrl } from '../utils/imageUrl';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Picture-Card file upload state
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

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

  const handleOpenAdd = () => {
    setEditingBlog(null);
    form.resetFields();
    setFileList([]);
    form.setFieldsValue({
      readTime: '4 min read',
      category: 'Pedagogy',
      isPublished: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (record) => {
    setEditingBlog(record);
    form.resetFields();
    form.setFieldsValue(record);

    if (record.coverImage) {
      setFileList([
        {
          uid: '-1',
          name: 'cover.jpg',
          status: 'done',
          url: record.coverImage,
        },
      ]);
    } else {
      setFileList([]);
    }

    setModalOpen(true);
  };

  const handleCustomUpload = async ({ file, onSuccess }) => {
    try {
      const res = await uploadService.uploadFile(file);
      const url = res?.data?.url || res?.url;
      if (url) {
        onSuccess({ url }, file);
      } else {
        throw new Error('Upload missing URL');
      }
    } catch (err) {
      const reader = new FileReader();
      reader.onload = () => {
        onSuccess({ url: reader.result }, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = ({ fileList }) => {
    const updated = fileList.map((f) => {
      if (f.response?.url) {
        return { ...f, url: f.response.url };
      }
      return f;
    });
    setFileList(updated);
  };

  const handleSave = async (values) => {
    try {
      setSubmitting(true);
      const coverImage = fileList[0]?.url || fileList[0]?.response?.url || values.coverImage || '';

      const payload = {
        ...values,
        coverImage,
      };

      if (editingBlog) {
        await blogService.update(editingBlog.id, payload);
        message.success('Article updated successfully');
      } else {
        await blogService.create(payload);
        message.success('Article published successfully');
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      message.error(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
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

  const uploadButton = (
    <div>
      <PlusOutlined style={{ fontSize: 18, color: '#94A3B8' }} />
      <div style={{ marginTop: 8, fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Upload</div>
    </div>
  );

  const columns = [
    {
      title: 'Cover',
      dataIndex: 'coverImage',
      width: 70,
      render: (img) => (
        <img
          src={getImageUrl(img, '/assets/hero_classroom.png')}
          alt="cover"
          style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }}
          onError={(e) => {
            e.currentTarget.src = '/assets/hero_classroom.png';
          }}
        />
      ),
    },
    { title: 'Article Title', dataIndex: 'title', render: (t) => <strong>{t}</strong> },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Read Time', dataIndex: 'readTime' },
    { title: 'Date', dataIndex: 'publishedAt', render: (d) => new Date(d || Date.now()).toLocaleDateString() },
    {
      title: 'Action',
      width: 120,
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(r)}
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
           
            Education Articles &amp; SEO Posts
          </h2>
          {/* <p style={{ color: '#777', margin: '2px 0 0' }}>Publish parent guides, learning lab articles, and announcements.</p> */}
        </div>

        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchBlogs}>Refresh</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ background: '#F5821F', borderColor: '#F5821F', borderRadius: 10, fontWeight: 700 }}
            onClick={handleOpenAdd}
          >
            Write New Article
          </Button>
        </Space>
      </div>

      <Table columns={columns} dataSource={blogs} rowKey="id" loading={loading} />

      {/* ── Fixed-Size Scrollable Blog Modal ── */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#FFF7EE', color: '#F5821F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileTextOutlined style={{ fontSize: 18 }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0F172A' }}>
              {editingBlog ? 'Edit Article' : 'Write New Article'}
            </span>
          </div>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={760}
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
              * Fill required fields and click publish
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
                {editingBlog ? 'Update Article' : 'Publish Article'}
              </Button>
            </Space>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 8 }}>
          <Form.Item
            name="title"
            label={<span style={{ fontWeight: 700 }}>Article Title</span>}
            rules={[{ required: true, message: 'Please enter article title' }]}
          >
            <Input placeholder="e.g. Why Phonics Outperforms Rote Learning" size="large" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="slug"
            label={<span style={{ fontWeight: 700 }}>URL Slug</span>}
            rules={[{ required: true, message: 'Please enter URL slug' }]}
          >
            <Input placeholder="e.g. why-phonics-outperforms-rote-learning" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span style={{ fontWeight: 700 }}>Category</span>}
            rules={[{ required: true }]}
          >
            <Select style={{ borderRadius: 10 }}>
              <Select.Option value="Pedagogy">Pedagogy</Select.Option>
              <Select.Option value="Parenting Guide">Parenting Guide</Select.Option>
              <Select.Option value="Cognitive Science">Cognitive Science</Select.Option>
              <Select.Option value="Announcements">Announcements</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="summary"
            label={<span style={{ fontWeight: 700 }}>Brief Summary</span>}
            rules={[{ required: true, message: 'Please write a brief summary' }]}
          >
            <Input.TextArea rows={2} placeholder="Quick 1-2 sentence overview for cards and meta descriptions..." style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="content"
            label={<span style={{ fontWeight: 700 }}>Full Article HTML / Markdown</span>}
            rules={[{ required: true, message: 'Please write article content' }]}
          >
            <Input.TextArea rows={6} placeholder="<p>Write your detailed article content here...</p>" style={{ borderRadius: 10 }} />
          </Form.Item>

          {/* Picture-Card Upload for Cover Image */}
          <Form.Item
            label={<span style={{ fontWeight: 700 }}>Cover Image</span>}
            extra={<span style={{ fontSize: '0.8rem', color: '#64748B' }}>Upload from device (JPG, PNG, WebP)</span>}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={(file) => {
                setPreviewImage(file.url || file.thumbUrl);
                setPreviewOpen(true);
              }}
              onChange={handleFileChange}
              customRequest={handleCustomUpload}
              maxCount={1}
              accept="image/*"
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Image Preview Modal */}
      {previewOpen && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}
