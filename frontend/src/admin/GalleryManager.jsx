import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, Upload, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { galleryService } from '../services';

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
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

  const handleUpload = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title || '');
    formData.append('category', values.category || 'activities');
    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj);
    } else if (values.imageUrl) {
      formData.append('imageUrl', values.imageUrl);
    } else {
      message.error('Please upload an image file or provide an Image URL');
      return;
    }

    try {
      await galleryService.create(formData);
      message.success('Gallery image uploaded successfully');
      setModalOpen(false);
      setFileList([]);
      form.resetFields();
      fetchGallery();
    } catch (err) {
      message.error(err.message || 'Upload failed');
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

  const columns = [
    {
      title: 'Preview',
      dataIndex: 'imageUrl',
      render: (url) => <img src={url} alt="thumbnail" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 8 }} />,
    },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Category', dataIndex: 'category', render: (c) => <Tag color="blue">{c}</Tag> },
    {
      title: 'Action',
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>📸 Media Gallery & Uniform Kits</h2>
          <p style={{ color: '#777', margin: '2px 0 0' }}>Upload and manage classroom photos, student kits, and activity visuals.</p>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ background: '#F5821F' }}
          onClick={() => {
            setFileList([]);
            form.resetFields();
            setModalOpen(true);
          }}
        >
          Add Media Image
        </Button>
      </div>

      <Table columns={columns} dataSource={items} rowKey="id" loading={loading} />

      <Modal
        title="Add Image to Gallery"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpload}>
          <Form.Item name="title" label="Image Title" rules={[{ required: true }]}>
            <Input placeholder="e.g. Science Day Experiment" />
          </Form.Item>

          <Form.Item name="category" label="Category" initialValue="activities" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="kits">🎒 Student Kits</Select.Option>
              <Select.Option value="classroom">🏫 Digital Labs / Classroom</Select.Option>
              <Select.Option value="activities">🎨 Activities / Art</Select.Option>
              <Select.Option value="events">🎉 Events / Annual Day</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Upload File">
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image File</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="imageUrl" label="Or Direct Image URL">
            <Input placeholder="https://..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" block style={{ background: '#F5821F' }}>
            Upload Media Image
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
