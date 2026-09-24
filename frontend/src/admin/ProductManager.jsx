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
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { productService } from '../services';

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

    // Format images, sizes, and items as comma/newline separated for easy editing
    const imagesStr = Array.isArray(record.images) ? record.images.join('\n') : '';
    const sizesStr = Array.isArray(record.sizes) ? record.sizes.join(', ') : '';
    const itemsStr = Array.isArray(record.items) ? record.items.join('\n') : '';
    const specsStr = record.specifications ? JSON.stringify(record.specifications, null, 2) : '';

    form.setFieldsValue({
      ...record,
      imagesList: imagesStr,
      sizesList: sizesStr,
      itemsList: itemsStr,
      specificationsJson: specsStr,
    });
    setModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      setSubmitting(true);

      // Parse images array
      let images = [];
      if (values.imagesList && values.imagesList.trim()) {
        images = values.imagesList
          .split('\n')
          .map((url) => url.trim())
          .filter((url) => url.length > 0);
      }
      if (images.length === 0 && values.image) {
        images = [values.image];
      }

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
          // If plain text, wrap it
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
        image: values.image || images[0] || '',
        images,
        sizes,
        specifications,
        price: values.price,
        subPrice: values.subPrice || '',
        description: values.description,
        items,
        inStock: values.inStock !== false,
        isActive: values.isActive !== false,
        sortOrder: values.sortOrder || 0,
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, payload);
        message.success('Product updated successfully!');
      } else {
        await productService.create(payload);
        message.success('New product created successfully!');
      }

      setModalVisible(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error('Failed to save product: ' + (err.message || 'Error occurred'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productService.delete(id);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete product');
    }
  };

  const handleToggleStock = async (record, checked) => {
    try {
      await productService.update(record.id, { inStock: checked });
      message.success(`Product marked as ${checked ? 'In Stock' : 'Out of Stock'}`);
      setProducts((prev) =>
        prev.map((p) => (p.id === record.id ? { ...p, inStock: checked } : p))
      );
    } catch {
      message.error('Failed to update stock status');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchText ||
      p.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchText.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 70,
      render: (img, record) => (
        <img
          src={img || record.images?.[0] || '/assets/kits.jpeg'}
          alt={record.title}
          style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }}
        />
      ),
    },
    {
      title: 'Product Title & Slug',
      key: 'title',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>{record.title}</div>
          <Text type="secondary" style={{ fontSize: '11px' }}>
            /store/{record.slug}
          </Text>
          {record.badge && (
            <div style={{ marginTop: 4 }}>
              <Tag color={record.badgeColor || 'orange'} style={{ fontSize: 10, fontWeight: 700 }}>
                {record.badge}
              </Tag>
            </div>
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
        const found = CATEGORY_OPTIONS.find((c) => c.value === cat);
        return <Tag color="blue" style={{ fontWeight: 600 }}>{found?.label || cat}</Tag>;
      },
    },
    {
      title: 'Price',
      key: 'price',
      width: 120,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 800, color: '#f7941d', fontSize: '15px' }}>{record.price}</div>
          {record.subPrice && <Text type="secondary" style={{ fontSize: '11px' }}>{record.subPrice}</Text>}
        </div>
      ),
    },
    {
      title: 'Sizes / Inclusions',
      key: 'details',
      width: 180,
      render: (_, record) => (
        <div>
          {Array.isArray(record.sizes) && record.sizes.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {record.sizes.map((s, idx) => (
                <Tag key={idx} style={{ fontSize: 10 }}>{s}</Tag>
              ))}
            </div>
          ) : (
            <Text type="secondary" style={{ fontSize: 11 }}>Standard Single Size</Text>
          )}
          {Array.isArray(record.images) && (
            <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
              📸 {record.images.length} Carousel Images
            </div>
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
          checked={inStock !== false}
          onChange={(checked) => handleToggleStock(record, checked)}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleOpenEditModal(record)}
          />
          <Popconfirm
            title="Delete this product?"
            description="Are you sure you want to remove this product from store?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes, Delete"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>
            <ShoppingOutlined style={{ color: '#f7941d', marginRight: 8 }} />
            Store Products &amp; Kits Manager
          </Title>
          <Text type="secondary">Add, edit, change prices, update carousel images and manage stock availability.</Text>
        </div>

        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchProducts}>
            Refresh
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAddModal} style={{ background: '#f7941d', borderColor: '#f7941d' }}>
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

      {/* Create / Edit Modal */}
      <Modal
        title={editingProduct ? 'Edit Product: ' + editingProduct.title : 'Add New Store Product'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={720}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="title"
                label="Product Title"
                rules={[{ required: true, message: 'Please enter product title' }]}
              >
                <Input placeholder="e.g. Frolic Signature Orange Polo T-Shirt" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select options={CATEGORY_OPTIONS} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Selling Price"
                rules={[{ required: true, message: 'e.g. ₹399' }]}
              >
                <Input placeholder="e.g. ₹399" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="subPrice" label="MRP / Sub-Price Text">
                <Input placeholder="e.g. MRP: ₹549 (Inclusive of all taxes)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="badge" label="Badge Text (Optional)">
                <Input placeholder="e.g. Official Uniform, Best Seller" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="badgeColor" label="Badge Color">
                <Select
                  options={[
                    { value: 'orange', label: 'Orange' },
                    { value: 'blue', label: 'Blue' },
                    { value: 'green', label: 'Green' },
                    { value: 'purple', label: 'Purple' },
                    { value: 'red', label: 'Red' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="image"
            label="Primary Featured Image URL"
            rules={[{ required: true, message: 'Please provide main image URL' }]}
          >
            <Input placeholder="https://images.unsplash.com/..." />
          </Form.Item>

          <Form.Item
            name="imagesList"
            label="2-Second Carousel Images (1 URL per line - up to 4 images)"
            tooltip="Each URL on a new line. These images will automatically rotate every 2 seconds on the product detail page."
          >
            <TextArea
              rows={4}
              placeholder="https://images.unsplash.com/photo-1...\nhttps://images.unsplash.com/photo-2...\nhttps://images.unsplash.com/photo-3..."
            />
          </Form.Item>

          <Form.Item
            name="sizesList"
            label="Available Sizes (Comma-separated, for clothing/apparel)"
            tooltip="Example: 2 – 3 Years, 3 – 4 Years, 4 – 5 Years, 5 – 6 Years"
          >
            <Input placeholder="2 – 3 Years, 3 – 4 Years, 4 – 5 Years, 5 – 6 Years" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Detailed Product Description"
            rules={[{ required: true, message: 'Please enter product description' }]}
          >
            <TextArea rows={3} placeholder="Comprehensive description of materials, suitability, and highlights..." />
          </Form.Item>

          <Form.Item
            name="itemsList"
            label="What's Included / Feature Highlights (1 item per line)"
          >
            <TextArea
              rows={3}
              placeholder="100% Bio-Washed Pique Cotton\nNon-Roll Ribbed Knit Collar\nAnti-Pinch Encased Waistband"
            />
          </Form.Item>

          <Form.Item
            name="specificationsJson"
            label="Specifications (JSON Object)"
            tooltip='Example: {"material": "100% Cotton", "fit": "Regular", "care": "Machine Wash"}'
          >
            <TextArea rows={3} placeholder='{"material": "100% Bio-Washed Pique Cotton", "fit": "Regular", "care": "Machine Wash Cold"}' />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="sortOrder" label="Sort Order">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="inStock" label="In Stock" valuePropName="checked">
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isActive" label="Active / Visible" valuePropName="checked">
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={submitting} style={{ background: '#f7941d', borderColor: '#f7941d' }}>
                {editingProduct ? 'Update Product' : 'Create Product'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
