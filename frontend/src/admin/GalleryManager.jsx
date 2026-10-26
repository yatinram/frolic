import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Popconfirm,
  Tag,
  Image,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  PictureOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { galleryService, uploadService } from '../services';
import { getImageUrl } from '../utils/imageUrl';

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Picture-Card upload state
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [form] = Form.useForm();

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await galleryService.getAll();
      if (res.success) {
        setItems(res.data || []);
      }
    } catch (err) {
      message.error('Could not load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenAdd = () => {
    setFileList([]);
    form.resetFields();
    form.setFieldsValue({ category: 'activities' });
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
    const uploadedUrl = fileList[0]?.url || fileList[0]?.response?.url || values.imageUrl;
    if (!uploadedUrl) {
      message.error('Please upload an image or provide an Image URL');
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('title', values.title || '');
      formData.append('category', values.category || 'activities');
      formData.append('imageUrl', uploadedUrl);

      await galleryService.create(formData);
      message.success('Gallery image uploaded successfully');
      setModalOpen(false);
      setFileList([]);
      form.resetFields();
      fetchGallery();
    } catch (err) {
      message.error(err.message || 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await galleryService.delete(id);
      message.success('Image removed from gallery');
      fetchGallery();
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
      title: 'Preview',
      dataIndex: 'imageUrl',
      width: 80,
      render: (url) => (
        <img
          src={getImageUrl(url, '/assets/kits.jpeg')}
          alt="thumbnail"
          style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }}
          onError={(e) => {
            e.currentTarget.src = '/assets/kits.jpeg';
          }}
        />
      ),
    },
    { title: 'Title', dataIndex: 'title', render: (t) => <strong>{t}</strong> },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 160,
      render: (c) => <Tag color="blue" style={{ borderRadius: 6 }}>{c}</Tag>,
    },
    {
      title: 'Action',
      width: 90,
      align: 'center',
      render: (_, r) => (
        <Popconfirm title="Delete image?" onConfirm={() => handleDelete(r.id)}>
          <Button size="small" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
           
            Media Gallery &amp; Uniform Kits
          </h2>
          {/* <p style={{ color: '#777', margin: '2px 0 0' }}>Upload and manage classroom photos, student kits, and activity visuals.</p> */}
        </div>

        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchGallery}>Refresh</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ background: '#F5821F', borderColor: '#F5821F', borderRadius: 10, fontWeight: 700 }}
            onClick={handleOpenAdd}
          >
            Add Media Image
          </Button>
        </Space>
      </div>

      <Table columns={columns} dataSource={items} rowKey="id" loading={loading} />

      {/* ── Fixed-Size Scrollable Gallery Modal ── */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#FFF7EE', color: '#F5821F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PictureOutlined style={{ fontSize: 18 }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0F172A' }}>
              Add Image to Gallery
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
              * Image will appear on public gallery
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
                Upload Media Image
              </Button>
            </Space>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 8 }}>
          <Form.Item
            name="title"
            label={<span style={{ fontWeight: 700 }}>Image Title</span>}
            rules={[{ required: true, message: 'Please enter image title' }]}
          >
            <Input placeholder="e.g. Science Day Experiment" size="large" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span style={{ fontWeight: 700 }}>Category</span>}
            initialValue="activities"
            rules={[{ required: true }]}
          >
            <Select size="large" style={{ borderRadius: 10 }}>
              <Select.Option value="kits">🎒 Student Kits</Select.Option>
              <Select.Option value="classroom">🏫 Digital Labs / Classroom</Select.Option>
              <Select.Option value="activities">🎨 Activities / Art</Select.Option>
              <Select.Option value="events">🎉 Events / Annual Day</Select.Option>
            </Select>
          </Form.Item>

          {/* Picture Card Upload */}
          <Form.Item
            label={<span style={{ fontWeight: 700 }}>Image File</span>}
            required
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

          <Form.Item
            name="imageUrl"
            label={<span style={{ fontWeight: 700 }}>Or Direct Image URL</span>}
          >
            <Input placeholder="https://..." style={{ borderRadius: 10 }} />
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
