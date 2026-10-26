import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Popconfirm,
  message,
  Card,
  Row,
  Col,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  ReloadOutlined,
  StarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CompassOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { centerService } from '../services';

const { Option } = Select;
const { TextArea } = Input;

const DEFAULT_PROGRAMS = [
  'Play Group',
  'Nursery',
  'LKG',
  'UKG',
  'English Lab',
  'Maths Lab',
  'Teacher Training',
];

const DEFAULT_FACILITIES = [
  'CCTV Monitored',
  'Smart Digital Classrooms',
  'Language & Phonics Lab',
  'Abacus Studio',
  'Activity Play Zone',
  'Child-Safe Play Turf',
  'Transport Facility',
  'Audio-Visual Pods',
  'Library Corner',
  'Sand & Water Play',
];

const BRANCH_TYPES = [
  'Flagship Campus',
  'Edu Lab & Preschool',
  'Learning Studio',
  'Franchise Center',
  'Innovation Hub',
];

export default function CenterManager() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const fetchCenters = async () => {
    setLoading(true);
    try {
      const res = await centerService.getAll({ activeOnly: 'false' });
      const data = res?.data?.data || res?.data || res || [];
      setCenters(Array.isArray(data) ? data : []);
    } catch (err) {
      message.error(err.message || 'Failed to fetch centers from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const handleOpenCreate = () => {
    setEditingCenter(null);
    form.resetFields();
    form.setFieldsValue({
      branchType: 'Edu Lab & Preschool',
      state: 'Gujarat',
      timing: 'Monday – Saturday: 8:30 AM – 5:30 PM',
      programs: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
      facilities: ['CCTV Monitored', 'Smart Digital Classrooms', 'Language & Phonics Lab', 'Activity Play Zone'],
      isFlagship: false,
      isActive: true,
      email: 'frolickidsedulabs@gmail.com',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (record) => {
    setEditingCenter(record);
    form.resetFields();
    form.setFieldsValue({
      ...record,
      programs: Array.isArray(record.programs) ? record.programs : [],
      facilities: Array.isArray(record.facilities) ? record.facilities : [],
    });
    setModalOpen(true);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (!editingCenter) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      form.setFieldsValue({ slug: autoSlug });
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const payload = {
        ...values,
        programs: values.programs || [],
        facilities: values.facilities || [],
      };

      if (editingCenter) {
        await centerService.update(editingCenter.id, payload);
        message.success(`Center "${payload.name}" updated successfully!`);
      } else {
        await centerService.create(payload);
        message.success(`Center "${payload.name}" created successfully!`);
      }

      setModalOpen(false);
      fetchCenters();
    } catch (err) {
      if (err.errorFields) {
        message.warning('Please complete all required fields.');
      } else {
        message.error(err.message || 'Operation failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      await centerService.delete(id);
      message.success(`Center "${name || id}" removed successfully`);
      fetchCenters();
    } catch (err) {
      message.error(err.message || 'Failed to delete center');
    }
  };

  const handleToggleStatus = async (record, checked) => {
    try {
      await centerService.update(record.id, { ...record, isActive: checked });
      message.success(`Center "${record.name}" status updated`);
      fetchCenters();
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const filteredCenters = centers.filter((c) => {
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.city?.toLowerCase().includes(q) ||
      c.district?.toLowerCase().includes(q) ||
      c.state?.toLowerCase().includes(q) ||
      c.area?.toLowerCase().includes(q) ||
      c.pincode?.includes(q) ||
      c.phone?.includes(q)
    );
  });

  // KPI calculations
  const totalCount = centers.length;
  const flagshipCount = centers.filter((c) => c.isFlagship).length;
  const activeCount = centers.filter((c) => c.isActive).length;
  const districtsCovered = new Set(centers.map((c) => c.district || c.city).filter(Boolean)).size;

  const columns = [
    {
      title: 'Center Name & Type',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
            {record.isFlagship && (
              <Tooltip title="Flagship Campus">
                <StarOutlined style={{ color: '#F5821F' }} />
              </Tooltip>
            )}
            <span>{text}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: 2 }}>
            <Tag color="orange" style={{ fontSize: '0.75rem', borderRadius: 4 }}>
              {record.branchType || 'Edu Lab & Preschool'}
            </Tag>
            <span style={{ fontFamily: 'monospace', color: '#94A3B8' }}>/locate-us</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Location & Address',
      key: 'location',
      render: (_, record) => (
        <div style={{ fontSize: '0.85rem' }}>
          <div style={{ fontWeight: 700, color: '#334155' }}>
            <EnvironmentOutlined style={{ color: '#F5821F', marginRight: 4 }} />
            {record.area ? `${record.area}, ` : ''}{record.city}
          </div>
          <div style={{ color: '#64748B', fontSize: '0.8rem' }}>
            {record.district ? `${record.district} Dist, ` : ''}{record.state} - {record.pincode}
          </div>
        </div>
      ),
    },
    {
      title: 'Contact Details',
      key: 'contact',
      render: (_, record) => (
        <div style={{ fontSize: '0.82rem' }}>
          {record.phone && (
            <div>
              <PhoneOutlined style={{ color: '#38A169', marginRight: 4 }} />
              <a href={`tel:${record.phone}`} style={{ color: '#334155', textDecoration: 'none' }}>
                {record.phone}
              </a>
            </div>
          )}
          {record.email && (
            <div style={{ color: '#64748B', marginTop: 2 }}>
              <MailOutlined style={{ color: '#3182CE', marginRight: 4 }} />
              {record.email}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Programs',
      dataIndex: 'programs',
      key: 'programs',
      render: (programs) => (
        <div style={{ maxWidth: 220, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {Array.isArray(programs) && programs.length > 0 ? (
            programs.slice(0, 3).map((p, idx) => (
              <Tag key={idx} color="blue" style={{ fontSize: '0.72rem', margin: 0 }}>
                {p}
              </Tag>
            ))
          ) : (
            <span style={{ color: '#CBD5E1', fontSize: '0.8rem' }}>None</span>
          )}
          {Array.isArray(programs) && programs.length > 3 && (
            <Tag style={{ fontSize: '0.72rem', margin: 0 }}>+{programs.length - 3}</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (active, record) => (
        <Switch
          checked={active}
          checkedChildren={<CheckCircleOutlined />}
          unCheckedChildren={<CloseCircleOutlined />}
          onChange={(checked) => handleToggleStatus(record, checked)}
          style={{ background: active ? '#10B981' : undefined }}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 130,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            ghost
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleOpenEdit(record)}
            style={{ borderColor: '#F5821F', color: '#F5821F' }}
          />
          <Popconfirm
            title="Delete Center"
            description={`Are you sure you want to delete "${record.name}"?`}
            onConfirm={() => handleDelete(record.id, record.name)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ── KPI STATS HEADER ── */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
              border: '1px solid rgba(245, 130, 31, 0.2)',
            }}
          >
            <div style={{ color: '#C2410C', fontSize: '0.85rem', fontWeight: 700 }}>TOTAL CENTERS</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#9A3412', marginTop: 4 }}>
              {totalCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#EA580C', marginTop: 2 }}>
              Across network
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <div style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 700 }}>ACTIVE CENTERS</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#065F46', marginTop: 4 }}>
              {activeCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: 2 }}>
              Currently visible on public site
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            <div style={{ color: '#1D4ED8', fontSize: '0.85rem', fontWeight: 700 }}>FLAGSHIP CAMPUSES</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1E40AF', marginTop: 4 }}>
              {flagshipCount}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#2563EB', marginTop: 2 }}>
              Featured & state-of-the-art
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
            }}
          >
            <div style={{ color: '#7E22CE', fontSize: '0.85rem', fontWeight: 700 }}>DISTRICTS COVERED</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#6B21A8', marginTop: 4 }}>
              {districtsCovered}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#9333EA', marginTop: 2 }}>
              Geographic regions
            </div>
          </Card>
        </Col>
      </Row>

      {/* ── TOOLBAR & SEARCH ── */}
      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>
              <CompassOutlined style={{ color: '#F5821F', marginRight: 8 }} />
              Find a Center Management
            </h2>
            <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '0.85rem' }}>
              Add, update, or remove school centers and digital lab campuses displayed on the public Find a Center page.
            </p>
          </div>

          <Space size="middle">
            <Input.Search
              placeholder="Search by center, city, district..."
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 280 }}
            />
            <Button icon={<ReloadOutlined />} onClick={fetchCenters}>
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenCreate}
              style={{ background: '#F5821F', borderColor: '#F5821F', fontWeight: 700 }}
            >
              Add New Center
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCenters}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 8, showTotal: (t) => `Total ${t} Centers` }}
          scroll={{ x: 950 }}
        />
      </Card>

      {/* ── FIXED WIDTH & SCROLLABLE CREATE / EDIT MODAL ── */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <EnvironmentOutlined style={{ color: '#F5821F', fontSize: '1.2rem' }} />
            <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#0F172A' }}>
              {editingCenter ? `Edit Center: ${editingCenter.name}` : 'Add New Learning Center'}
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
            padding: '20px 24px',
          },
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '10px 4px' }}>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              loading={submitting}
              onClick={handleSave}
              style={{ background: '#F5821F', borderColor: '#F5821F', fontWeight: 700 }}
            >
              {editingCenter ? 'Update Center Details' : 'Create Center'}
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          {/* SECTION 1: BASIC INFORMATION */}
          <div
            style={{
              background: '#FFF7ED',
              padding: '10px 14px',
              borderRadius: 8,
              fontWeight: 800,
              color: '#C2410C',
              fontSize: '0.85rem',
              marginBottom: 14,
            }}
          >
            1. BASIC DETAILS & CAMPUS TYPE
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={16}>
              <Form.Item
                name="name"
                label="Center / Branch Name"
                rules={[{ required: true, message: 'Please enter center name' }]}
              >
                <Input
                  placeholder="e.g. Frolic Kids Edu Labs — Sargasan Campus"
                  onChange={handleNameChange}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="slug"
                label="URL Slug (Unique)"
                rules={[{ required: true, message: 'Please enter URL slug' }]}
              >
                <Input placeholder="e.g. gandhinagar-sargasan" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="branchType"
                label="Branch / Campus Category"
                rules={[{ required: true }]}
              >
                <Select size="large">
                  {BRANCH_TYPES.map((b) => (
                    <Option key={b} value={b}>
                      {b}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item name="isFlagship" label="Flagship Campus" valuePropName="checked">
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item name="isActive" label="Publicly Active" valuePropName="checked">
                <Switch checkedChildren="Active" unCheckedChildren="Hidden" defaultChecked />
              </Form.Item>
            </Col>
          </Row>

          {/* SECTION 2: ADDRESS & TERRITORY */}
          <div
            style={{
              background: '#F1F5F9',
              padding: '10px 14px',
              borderRadius: 8,
              fontWeight: 800,
              color: '#334155',
              fontSize: '0.85rem',
              marginTop: 10,
              marginBottom: 14,
            }}
          >
            2. ADDRESS & GEOGRAPHY
          </div>

          <Form.Item
            name="address"
            label="Full Physical Address"
            rules={[{ required: true, message: 'Please enter full street address' }]}
          >
            <TextArea
              rows={2}
              placeholder="e.g. 109, R Services, Sriprad Aayansh, Near Sargasan Cross Road"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="area"
                label="Area / Locality / Landmark"
                rules={[{ required: true, message: 'Please enter area' }]}
              >
                <Input placeholder="e.g. Sargasan" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please enter city' }]}
              >
                <Input placeholder="e.g. Gandhinagar" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="district" label="District">
                <Input placeholder="e.g. Gandhinagar" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item name="taluka" label="Taluka / Tehsil">
                <Input placeholder="e.g. Gandhinagar" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="state" label="State" rules={[{ required: true }]}>
                <Input placeholder="Gujarat" defaultValue="Gujarat" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="pincode"
                label="Pincode"
                rules={[{ required: true, message: 'Please enter pincode' }]}
              >
                <Input placeholder="382421" />
              </Form.Item>
            </Col>
          </Row>

          {/* SECTION 3: CONTACT & HOURS */}
          <div
            style={{
              background: '#F1F5F9',
              padding: '10px 14px',
              borderRadius: 8,
              fontWeight: 800,
              color: '#334155',
              fontSize: '0.85rem',
              marginTop: 10,
              marginBottom: 14,
            }}
          >
            3. CONTACT INFO & OPERATING HOURS
          </div>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Contact Phone Number"
                rules={[{ required: true, message: 'Please enter phone' }]}
              >
                <Input placeholder="+91 75750 08820" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="email" label="Branch Email Address">
                <Input placeholder="frolickidsedulabs@gmail.com" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="timing" label="Operating Days & Timings">
            <Input placeholder="e.g. Monday – Saturday: 8:30 AM – 5:30 PM" />
          </Form.Item>

          {/* SECTION 4: PROGRAMS & FACILITIES */}
          <div
            style={{
              background: '#F1F5F9',
              padding: '10px 14px',
              borderRadius: 8,
              fontWeight: 800,
              color: '#334155',
              fontSize: '0.85rem',
              marginTop: 10,
              marginBottom: 14,
            }}
          >
            4. ACADEMIC PROGRAMS & FACILITIES
          </div>

          <Form.Item name="programs" label="Programs Offered at this Branch">
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Select or type custom programs"
              options={DEFAULT_PROGRAMS.map((p) => ({ label: p, value: p }))}
            />
          </Form.Item>

          <Form.Item name="facilities" label="Key Amenities & Lab Facilities">
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Select or type custom facilities"
              options={DEFAULT_FACILITIES.map((f) => ({ label: f, value: f }))}
            />
          </Form.Item>

          {/* SECTION 5: GOOGLE MAP & GPS COORDINATES */}
          <div
            style={{
              background: '#F1F5F9',
              padding: '10px 14px',
              borderRadius: 8,
              fontWeight: 800,
              color: '#334155',
              fontSize: '0.85rem',
              marginTop: 10,
              marginBottom: 14,
            }}
          >
            5. GOOGLE MAPS & GPS NAVIGATION
          </div>

          <Form.Item
            name="mapQuery"
            label="Google Map Search Query / Address"
            rules={[{ required: true, message: 'Please enter map query' }]}
          >
            <Input placeholder="e.g. 109 Sriprad Aayansh, Sargasan, Gandhinagar, Gujarat 382421" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="latitude" label="GPS Latitude (Optional)">
                <InputNumber style={{ width: '100%' }} step="0.0001" placeholder="23.1895" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="longitude" label="GPS Longitude (Optional)">
                <InputNumber style={{ width: '100%' }} step="0.0001" placeholder="72.6322" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
