import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Space,
  Tag,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
  InputNumber,
  Typography,
  Upload,
  Image,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { productService, uploadService } from '../services';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CATEGORY_OPTIONS = [
  { value: 'uniforms', label: 'Uniforms & Apparel' },
  { value: 'kits', label: 'Kits & Backpacks' },
  { value: 'books', label: 'Books & Phonics' },
  { value: 'stationery', label: 'Art & Stationery' },
  { value: 'digital', label: 'Digital Lab' },
];

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Picture-Card Upload States
  const [mainFileList, setMainFileList] = useState([]);
  const [carouselFileList, setCarouselFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll({ activeOnly: 'false' });
      const data = res?.data || res || [];
      setProducts(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error(err);
      message.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setMainFileList([]);
    setCarouselFileList([]);
    form.setFieldsValue({
      category: 'uniforms',
      inStock: true,
      isActive: true,
      badgeColor: 'orange',
      sortOrder: products.length + 1,
    });
    setModalVisible(true);
  };

  const handleOpenEditModal = (record) => {
    setEditingProduct(record);
    form.resetFields();

    // Setup main image fileList
    if (record.image) {
      setMainFileList([
        {
          uid: '-1',
          name: 'primary-image.png',
          status: 'done',
          url: record.image,
        },
      ]);
    } else {
      setMainFileList([]);
    }

    // Setup carousel images fileList
    const rawCarousel = Array.isArray(record.images) ? record.images : record.image ? [record.image] : [];
    const formattedCarousel = rawCarousel.map((imgUrl, index) => ({
      uid: `-${index + 2}`,
      name: `carousel-${index + 1}.png`,
      status: 'done',
      url: imgUrl,
    }));
    setCarouselFileList(formattedCarousel);

    const sizesStr = Array.isArray(record.sizes) ? record.sizes.join(', ') : '';
    const itemsStr = Array.isArray(record.items) ? record.items.join('\n') : '';
    const specsStr = record.specifications ? JSON.stringify(record.specifications, null, 2) : '';

    form.setFieldsValue({
      ...record,
      sizesList: sizesStr,
      itemsList: itemsStr,
      specificationsJson: specsStr,
    });
    setModalVisible(true);
  };

  // Preview helper
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview || file.thumbUrl);
    setPreviewOpen(true);
  };

  // Main Image Upload Handler
  const handleMainCustomUpload = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadService.uploadFile(file);
      const url = res?.data?.url || res?.url;
      if (url) {
        onSuccess({ url }, file);
      } else {
        throw new Error('Upload response missing URL');
      }
    } catch (err) {
      console.warn('Backend upload error, using local data URL fallback:', err);
      const reader = new FileReader();
      reader.onload = () => {
        onSuccess({ url: reader.result }, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMainChange = ({ fileList }) => {
    const updated = fileList.map((file) => {
      if (file.response?.url) {
        return { ...file, url: file.response.url };
      }
      return file;
    });
    setMainFileList(updated);
  };

  // Carousel Images Upload Handler
  const handleCarouselCustomUpload = async ({ file, onSuccess, onError }) => {
    try {
      const res = await uploadService.uploadFile(file);
      const url = res?.data?.url || res?.url;
      if (url) {
        onSuccess({ url }, file);
      } else {
        throw new Error('Upload response missing URL');
      }
    } catch (err) {
      console.warn('Backend upload error, using local data URL fallback:', err);
      const reader = new FileReader();
      reader.onload = () => {
        onSuccess({ url: reader.result }, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCarouselChange = ({ fileList }) => {
    const updated = fileList.map((file) => {
      if (file.response?.url) {
        return { ...file, url: file.response.url };
      }
      return file;
    });
    setCarouselFileList(updated);
  };

  const handleFormSubmit = async (values) => {
    try {
      // Validate primary image
      const primaryUrl = mainFileList[0]?.url || mainFileList[0]?.response?.url || '';
      if (!primaryUrl) {
        message.error('Please upload a Primary Featured Image');
        return;
      }

      setSubmitting(true);

      // Extract carousel image URLs
      const images = carouselFileList
        .map((f) => f.url || f.response?.url)
        .filter(Boolean);

      // Parse sizes array
      let sizes = [];
      if (values.sizesList && values.sizesList.trim()) {
        sizes = values.sizesList
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }

      // Parse items checklist
      let items = [];
      if (values.itemsList && values.itemsList.trim()) {
        items = values.itemsList
          .split('\n')
          .map((item) => item.trim())
          .filter((item) => item.length > 0);
      }

      // Parse specifications JSON
      let specifications = {};
      if (values.specificationsJson && values.specificationsJson.trim()) {
        try {
          specifications = JSON.parse(values.specificationsJson);
        } catch {
          specifications = { details: values.specificationsJson.trim() };
        }
      }

      // Auto generate slug if missing
      const slug =
        values.slug?.trim() ||
        values.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      const payload = {
        title: values.title,
        slug,
        category: values.category,
        badge: values.badge || '',
        badgeColor: values.badgeColor || 'orange',
        image: primaryUrl,
        images: images.length > 0 ? images : [primaryUrl],
        sizes,
        specifications,
        price: values.price,
        subPrice: values.subPrice || '',
        description: values.description,
        items,
        inStock: Boolean(values.inStock),
        sortOrder: Number(values.sortOrder) || 0,
        isActive: Boolean(values.isActive),
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, payload);
        message.success('Product updated successfully!');
      } else {
        await productService.create(payload);
        message.success('New product added to store!');
      }

      setModalVisible(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error(err.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productService.delete(id);
      message.success('Product removed');
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete product');
    }
  };

  const handleToggleActive = async (record, checked) => {
    try {
      await productService.update(record.id, { isActive: checked });
      message.success(`Product ${checked ? 'published' : 'hidden'}`);
      setProducts((prev) =>
        prev.map((p) => (p.id === record.id ? { ...p, isActive: checked } : p))
      );
    } catch (err) {
      console.error(err);
      message.error('Failed to toggle status');
    }
  };

  const handleToggleStock = async (record, checked) => {
    try {
      await productService.update(record.id, { inStock: checked });
      message.success(`Stock status updated to ${checked ? 'In Stock' : 'Out of Stock'}`);
      setProducts((prev) =>
        prev.map((p) => (p.id === record.id ? { ...p, inStock: checked } : p))
      );
    } catch (err) {
      console.error(err);
      message.error('Failed to toggle stock');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchText ||
      p.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchText.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchText.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const uploadButton = (
    <div>
      <PlusOutlined style={{ fontSize: 18, color: '#94A3B8' }} />
      <div style={{ marginTop: 8, fontWeight: 700, fontSize: '0.85rem', color: '#475569' }}>Upload</div>
    </div>
  );

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 70,
      render: (img) => (
        <img
          src={img || '/assets/kits.jpeg'}
          alt="product"
          style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }}
          onError={(e) => {
            e.target.src = '/assets/kits.jpeg';
          }}
        />
      ),
    },
    {
      title: 'Product Info',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{title}</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            <code>/{record.slug}</code>
          </div>
          {record.badge && (
            <Tag color={record.badgeColor || 'orange'} style={{ marginTop: 4, borderRadius: 6, fontSize: '0.75rem' }}>
              {record.badge}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 140,
      render: (cat) => {
        const opt = CATEGORY_OPTIONS.find((c) => c.value === cat);
        return <Tag color="blue" style={{ borderRadius: 6 }}>{opt ? opt.label : cat}</Tag>;
      },
    },
    {
      title: 'Pricing',
      dataIndex: 'price',
      key: 'price',
      width: 130,
      render: (price, record) => (
        <div>
          <div style={{ fontWeight: 800, color: '#f7941d', fontSize: '1rem' }}>{price}</div>
          {record.subPrice && (
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{record.subPrice}</div>
          )}
        </div>
      ),
    },
    {
      title: 'In Stock',
      dataIndex: 'inStock',
      key: 'inStock',
      width: 100,
      render: (inStock, record) => (
        <Switch
          checked={inStock}
          onChange={(checked) => handleToggleStock(record, checked)}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      ),
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 90,
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={(checked) => handleToggleActive(record, checked)}
          checkedChildren="Live"
          unCheckedChildren="Off"
        />
      ),
    },
    {
      title: 'Order',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      width: 70,
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#0072bc' }} />}
            onClick={() => handleOpenEditModal(record)}
          />
          <Popconfirm
            title="Delete product?"
            description="Are you sure you want to permanently delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={3} style={{ margin: 0, color: '#0f172a', fontWeight: 800 }}>
         
            Store Products &amp; Kits Manager
          </Title>
        </div>

        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchProducts}>
            Refresh
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAddModal} style={{ background: '#f7941d', borderColor: '#f7941d', borderRadius: 10, fontWeight: 700 }}>
            Add New Product
          </Button>
        </Space>
      </div>

      {/* Filter Row */}
      <Card bodyStyle={{ padding: '14px 20px' }} style={{ marginBottom: 20, borderRadius: 14 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Search by title or slug..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              style={{ width: '100%' }}
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={[
                { value: 'all', label: 'All Categories' },
                ...CATEGORY_OPTIONS,
              ]}
            />
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Text type="secondary" style={{ fontWeight: 600 }}>
              Showing {filteredProducts.length} of {products.length} products
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Products Table */}
      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        bordered
      />

      {/* ── Fixed-Size Scrollable Product Modal ── */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: '#FFF7EE', color: '#F7941D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingOutlined style={{ fontSize: 18 }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0F172A' }}>
              {editingProduct ? `Edit Product: ${editingProduct.title}` : 'Add New Store Product'}
            </span>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={780}
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
              * Make sure to provide price &amp; primary image
            </span>
            <Space>
              <Button onClick={() => setModalVisible(false)} style={{ borderRadius: 10, fontWeight: 600 }}>
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={submitting}
                style={{ background: '#F7941D', borderColor: '#F7941D', borderRadius: 10, fontWeight: 700 }}
              >
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </Space>
          </div>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} style={{ marginTop: 8 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="title"
                label={<span style={{ fontWeight: 700 }}>Product Title</span>}
                rules={[{ required: true, message: 'Please enter product title' }]}
              >
                <Input placeholder="e.g. Frolic Signature Orange Polo T-Shirt" size="large" style={{ borderRadius: 10 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label={<span style={{ fontWeight: 700 }}>Category</span>} rules={[{ required: true }]}>
                <Select options={CATEGORY_OPTIONS} size="large" style={{ borderRadius: 10 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label={<span style={{ fontWeight: 700 }}>Selling Price</span>}
                rules={[{ required: true, message: 'e.g. ₹399' }]}
              >
                <Input placeholder="e.g. ₹399" style={{ borderRadius: 10 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="subPrice" label={<span style={{ fontWeight: 700 }}>MRP / Sub-Price Text</span>}>
                <Input placeholder="e.g. MRP: ₹549 (Inclusive of all taxes)" style={{ borderRadius: 10 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="badge" label={<span style={{ fontWeight: 700 }}>Badge Text (Optional)</span>}>
                <Input placeholder="e.g. Official Uniform, Best Seller" style={{ borderRadius: 10 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="badgeColor" label={<span style={{ fontWeight: 700 }}>Badge Color</span>}>
                <Select
                  options={[
                    { value: 'orange', label: 'Orange' },
                    { value: 'blue', label: 'Blue' },
                    { value: 'green', label: 'Green' },
                    { value: 'purple', label: 'Purple' },
                    { value: 'red', label: 'Red' },
                  ]}
                  style={{ borderRadius: 10 }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* ── Picture Card Main Featured Image Upload ── */}
          <Form.Item
            label={<span style={{ fontWeight: 700 }}>Primary Featured Image</span>}
            required
            extra={<span style={{ fontSize: '0.8rem', color: '#64748B' }}>Accepts JPG, PNG, WebP — up to 5MB. Click + to upload.</span>}
            style={{ marginBottom: 20 }}
          >
            <Upload
              listType="picture-card"
              fileList={mainFileList}
              onPreview={handlePreview}
              onChange={handleMainChange}
              customRequest={handleMainCustomUpload}
              maxCount={1}
              accept="image/*"
            >
              {mainFileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          {/* ── Picture Card Carousel Gallery Upload ── */}
          <Form.Item
            label={<span style={{ fontWeight: 700 }}>Carousel Gallery Images (Max 4)</span>}
            extra={<span style={{ fontSize: '0.8rem', color: '#64748B' }}>Accepts JPG, PNG, WebP — up to 5MB each. Max 4 images. Rotates automatically every 2 seconds on detail page.</span>}
            style={{ marginBottom: 20 }}
          >
            <Upload
              listType="picture-card"
              fileList={carouselFileList}
              onPreview={handlePreview}
              onChange={handleCarouselChange}
              customRequest={handleCarouselCustomUpload}
              maxCount={4}
              multiple
              accept="image/*"
            >
              {carouselFileList.length >= 4 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item
            name="sizesList"
            label={<span style={{ fontWeight: 700 }}>Available Sizes (Comma-separated)</span>}
            tooltip="Example: 2 – 3 Years, 3 – 4 Years, 4 – 5 Years, 5 – 6 Years"
          >
            <Input placeholder="2 – 3 Years, 3 – 4 Years, 4 – 5 Years, 5 – 6 Years" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span style={{ fontWeight: 700 }}>Detailed Product Description</span>}
            rules={[{ required: true, message: 'Please enter product description' }]}
          >
            <TextArea rows={3} placeholder="Comprehensive description of materials, suitability, and highlights..." style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item
            name="itemsList"
            label={<span style={{ fontWeight: 700 }}>What's Included / Feature Highlights (1 item per line)</span>}
          >
            <TextArea
              rows={3}
              placeholder="100% Bio-Washed Pique Cotton\nNon-Roll Ribbed Knit Collar\nAnti-Pinch Encased Waistband"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item
            name="specificationsJson"
            label={<span style={{ fontWeight: 700 }}>Specifications (JSON Object)</span>}
            tooltip='Example: {"material": "100% Cotton", "fit": "Regular", "care": "Machine Wash"}'
          >
            <TextArea
              rows={3}
              placeholder='{"material": "100% Bio-Washed Pique Cotton", "fit": "Regular", "care": "Machine Wash Cold"}'
              style={{ borderRadius: 10, fontFamily: 'monospace', fontSize: '0.84rem' }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="sortOrder" label={<span style={{ fontWeight: 700 }}>Sort Order</span>}>
                <InputNumber min={0} style={{ width: '100%', borderRadius: 10 }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="inStock" label={<span style={{ fontWeight: 700 }}>In Stock</span>} valuePropName="checked">
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isActive" label={<span style={{ fontWeight: 700 }}>Active / Visible</span>} valuePropName="checked">
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </Col>
          </Row>
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
