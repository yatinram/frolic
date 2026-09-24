import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Tabs,
  message,
  Popconfirm,
  Card,
  Row,
  Col,
  Divider,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  BookOutlined,
  CheckCircleOutlined,
  MinusCircleOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  SmileOutlined,
  SoundOutlined,
  TeamOutlined,
  CalculatorOutlined,
  GlobalOutlined,
  PictureOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  DesktopOutlined,
  TranslationOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { programService } from '../services';

const { Option } = Select;
const { TextArea } = Input;

const ICON_OPTIONS = [
  { label: 'SmileOutlined (Early Childhood)', value: 'SmileOutlined' },
  { label: 'BookOutlined (Reading & English)', value: 'BookOutlined' },
  { label: 'ReadOutlined (Literature)', value: 'ReadOutlined' },
  { label: 'RocketOutlined (Future & Ready)', value: 'RocketOutlined' },
  { label: 'CalculatorOutlined (Maths & Abacus)', value: 'CalculatorOutlined' },
  { label: 'TranslationOutlined (Languages & DIEL)', value: 'TranslationOutlined' },
  { label: 'SafetyCertificateOutlined (Teacher Training)', value: 'SafetyCertificateOutlined' },
  { label: 'ExperimentOutlined (Science & Labs)', value: 'ExperimentOutlined' },
  { label: 'SoundOutlined (Phonics & Vocal)', value: 'SoundOutlined' },
  { label: 'TeamOutlined (Social & Mentorship)', value: 'TeamOutlined' },
  { label: 'GlobalOutlined (EVS & Discovery)', value: 'GlobalOutlined' },
  { label: 'PictureOutlined (Creative Arts)', value: 'PictureOutlined' },
  { label: 'DesktopOutlined (Digital Tech)', value: 'DesktopOutlined' },
  { label: 'ClockCircleOutlined (Schedule & Routine)', value: 'ClockCircleOutlined' },
];

export default function ProgramManager() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await programService.getAll({ activeOnly: 'false' });
      // Unpack response: res.data || res
      const list = res?.data?.data || res?.data || res || [];
      setPrograms(Array.isArray(list) ? list : []);
    } catch (err) {
      message.error('Failed to fetch programs from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenCreate = () => {
    setEditingProgram(null);
    form.resetFields();
    form.setFieldsValue({
      category: 'preschool',
      categoryLabel: 'Preschool Foundation',
      accentColor: '#F7941D',
      iconType: 'BookOutlined',
      heroBg: '/assets/hero_kids_clean.png',
      sortOrder: programs.length + 1,
      isActive: true,
      quickSpecs: {
        schedule: '3.5 Hours / Day (Mon – Sat)',
        ratio: '1:10 (Teacher + Ayah)',
        kit: 'Pabulum® Student Kit',
        safety: '100% App-Accessible CCTV Campus',
        duration: '1 Academic Year (4 Terms)',
      },
      pillars: [
        { number: '1', title: 'Sensory & Cognitive Lab', icon: 'ExperimentOutlined', color: '#FF5252', desc: 'Tactile discovery, primary colors and pattern matching.' },
        { number: '2', title: 'Gross & Fine Motor Skills', icon: 'SmileOutlined', color: '#10AC84', desc: 'Bead grasping, clay pinching and balance coordination.' },
      ],
      curriculum: [
        { step: 'Term 1: Foundations & Colors', details: 'Introduction to lines, primary colors and sensory exploration.' },
        { step: 'Term 2: Nature & Living World', details: 'Animals, plants, rhymes and social sharing habits.' },
      ],
      milestones: [
        'Recognizes fundamental concepts and sounds',
        'Demonstrates comfortable separation from parents',
      ],
      dailyRoutine: [
        { time: '08:30 AM', title: 'Welcome Circle & Attendance', icon: 'SmileOutlined', desc: 'Greeting song, weather check and mentor connection.' },
        { time: '09:00 AM', title: 'Sensory & Learning Station', icon: 'BookOutlined', desc: 'Hands-on discovery and structured activity.' },
      ],
    });
    setActiveTab('1');
    setDrawerOpen(true);
  };

  const handleOpenEdit = (record) => {
    setEditingProgram(record);
    form.resetFields();
    form.setFieldsValue({
      ...record,
      title: record.title || record.name,
      name: record.name || record.title,
      quickSpecs: record.quickSpecs || {},
      pillars: record.pillars || [],
      curriculum: record.curriculum || [],
      milestones: record.milestones || [],
      dailyRoutine: record.dailyRoutine || [],
    });
    setActiveTab('1');
    setDrawerOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!editingProgram) {
      // Auto-generate slug for new programs
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      form.setFieldsValue({ slug: autoSlug, name: val });
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      const payload = {
        ...values,
        name: values.title || values.name,
        title: values.title || values.name,
      };

      if (editingProgram) {
        await programService.update(editingProgram.id, payload);
        message.success(`Program "${payload.title}" updated successfully!`);
      } else {
        await programService.create(payload);
        message.success(`Program "${payload.title}" created successfully!`);
      }

      setDrawerOpen(false);
      fetchPrograms();
    } catch (err) {
      if (err.errorFields) {
        message.warning('Please check required fields in all tabs');
      } else {
        message.error(err.message || 'Operation failed');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    try {
      await programService.delete(id);
      message.success(`Program "${title || id}" deleted successfully`);
      fetchPrograms();
    } catch (err) {
      message.error(err.message || 'Delete failed');
    }
  };

  const handleToggleStatus = async (record, checked) => {
    try {
      await programService.update(record.id, { isActive: checked });
      message.success(`Status updated for ${record.title || record.name}`);
      setPrograms((prev) =>
        prev.map((p) => (p.id === record.id ? { ...p, isActive: checked } : p))
      );
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Order',
      dataIndex: 'sortOrder',
      width: 70,
      render: (v) => <Tag color="default">#{v || 0}</Tag>,
    },
    {
      title: 'Program Title & Code',
      key: 'title',
      render: (_, r) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: r.accentColor || '#F7941D',
                display: 'inline-block',
              }}
            />
            <strong style={{ fontSize: '0.98rem', color: '#0F172A' }}>
              {r.title || r.name}
            </strong>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 2 }}>
            <code>/{r.slug}</code> {r.courseCode && `• ${r.courseCode}`}
          </div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 140,
      render: (c, r) => {
        let color = 'orange';
        if (c === 'lab') color = 'blue';
        if (c === 'training') color = 'purple';
        return (
          <div>
            <Tag color={color}>{c?.toUpperCase()}</Tag>
            {r.categoryLabel && (
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
                {r.categoryLabel}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: 'Target Age Group',
      dataIndex: 'ageGroup',
      width: 150,
      render: (a) => <Tag color="cyan">{a || 'All Ages'}</Tag>,
    },
    {
      title: 'Specs Summary',
      key: 'specs',
      render: (_, r) => {
        const specs = r.quickSpecs || {};
        return (
          <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
            <div>⏰ {specs.schedule || 'Standard Schedule'}</div>
            <div>👥 {specs.ratio || '1:10 Ratio'}</div>
          </div>
        );
      },
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      width: 90,
      render: (active, r) => (
        <Switch
          checked={active}
          size="small"
          onChange={(checked) => handleToggleStatus(r, checked)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 160,
      render: (_, r) => (
        <Space>
          <Tooltip title="Preview Live Page">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => window.open(`/programs/${r.slug}`, '_blank')}
            />
          </Tooltip>
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            style={{ background: '#F7941D', borderColor: '#F7941D' }}
            onClick={() => handleOpenEdit(r)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Program?"
            description={`Are you sure you want to delete ${r.title || r.name}?`}
            onConfirm={() => handleDelete(r.id, r.title || r.name)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '4px 0' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 24,
          padding: '16px 20px',
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #FED7AA',
          boxShadow: '0 4px 14px rgba(247, 148, 29, 0.08)',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
            📚 Programs &amp; Curricula Management
          </h2>
          <p style={{ color: '#64748B', margin: '4px 0 0', fontSize: '0.86rem' }}>
            Manage rich course descriptions, 4 NEP learning pillars, syllabus terms, milestones, and daily routines.
          </p>
        </div>

        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchPrograms} loading={loading}>
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ background: 'linear-gradient(135deg, #F7941D 0%, #EA580C 100%)', fontWeight: 700, height: 40 }}
            onClick={handleOpenCreate}
          >
            Add New Program
          </Button>
        </Space>
      </div>

      {/* Main Table */}
      <Card style={{ borderRadius: 18, border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <Table
          columns={columns}
          dataSource={programs}
          rowKey={(r) => r.id || r.slug}
          loading={loading}
          pagination={{ pageSize: 10, showTotal: (t) => `Total ${t} Programs` }}
        />
      </Card>

      {/* ── MULTI-TAB RICH PROGRAM EDITOR DRAWER ── */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BookOutlined style={{ color: '#F7941D', fontSize: 20 }} />
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0F172A' }}>
              {editingProgram ? `Edit Program: ${editingProgram.title || editingProgram.name}` : 'Create New Program'}
            </span>
          </div>
        }
        width={820}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        extra={
          <Space>
            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              loading={saving}
              onClick={handleSave}
              style={{ background: '#F7941D', borderColor: '#F7941D', fontWeight: 800 }}
            >
              Save Program
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: '1',
                label: '📌 1. Basic Info',
                children: (
                  <div style={{ paddingTop: 8 }}>
                    <Row gutter={16}>
                      <Col span={14}>
                        <Form.Item
                          name="title"
                          label="Program Title"
                          rules={[{ required: true, message: 'Please enter program title' }]}
                        >
                          <Input
                            placeholder="e.g. Play Group / Junior KG"
                            onChange={handleTitleChange}
                            size="large"
                            style={{ fontWeight: 700 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          name="slug"
                          label="URL Slug (Unique)"
                          rules={[{ required: true, message: 'Please enter slug' }]}
                        >
                          <Input placeholder="e.g. play-group" size="large" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                          <Select size="large">
                            <Option value="preschool">Preschool Program</Option>
                            <Option value="lab">Digital Learning Lab</Option>
                            <Option value="training">Teacher Certification</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="categoryLabel" label="Category Label">
                          <Input placeholder="e.g. Preschool Foundation" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="ageGroup" label="Target Age Group" rules={[{ required: true }]}>
                          <Input placeholder="e.g. 1.5 – 2.5 Years" size="large" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item name="courseCode" label="Course Code">
                          <Input placeholder="e.g. FL-PG-01" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="badgeText" label="Badge Text">
                          <Input placeholder="e.g. Ages 1.5 – 2.5" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="accentColor" label="Theme Color">
                          <Input placeholder="#FF5252 / #F7941D" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item name="tagline" label="Tagline / Header Subtitle">
                      <Input placeholder="e.g. Sensory Exploration, Language Genesis & Social Comfort" />
                    </Form.Item>

                    <Form.Item name="shortDescription" label="Short Summary Description">
                      <TextArea rows={2} placeholder="Brief summary shown on hub cards..." />
                    </Form.Item>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name="image" label="Card Image URL">
                          <Input placeholder="https://images.unsplash.com/... or /assets/..." />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="iconType" label="Ant Design Icon">
                          <Select options={ICON_OPTIONS} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name="heroBg" label="Hero Background Image">
                          <Input placeholder="/assets/hero_kids_clean.png" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="gradient" label="Gradient String (Optional)">
                          <Input placeholder="linear-gradient(135deg, #FF5252 0%, #F5821F 100%)" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item name="sortOrder" label="Sort Order">
                          <InputNumber min={0} max={100} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="isActive" label="Published (Live)" valuePropName="checked">
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ),
              },
              {
                key: '2',
                label: '📊 2. Overview & Specs',
                children: (
                  <div style={{ paddingTop: 8 }}>
                    <Form.Item name="overview" label="Pedagogical Approach & Philosophy Overview">
                      <TextArea
                        rows={4}
                        placeholder="Detailed pedagogical overview and learning approach for this grade..."
                      />
                    </Form.Item>

                    <Divider orientation="left" style={{ fontSize: '0.9rem', color: '#F7941D' }}>
                      At-a-Glance Quick Specifications
                    </Divider>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name={['quickSpecs', 'schedule']} label="Daily Schedule">
                          <Input placeholder="e.g. 3.5 Hours / Day (Mon – Sat)" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name={['quickSpecs', 'ratio']} label="Teacher / Mentor Ratio">
                          <Input placeholder="e.g. 1:8 (Lead Mentor + Ayah)" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name={['quickSpecs', 'kit']} label="Student Learning Kit Included">
                          <Input placeholder="e.g. Pabulum® Toddler Sensory Discovery Kit" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name={['quickSpecs', 'safety']} label="Campus Safety Specification">
                          <Input placeholder="e.g. 100% App-Accessible CCTV Campus" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item name={['quickSpecs', 'duration']} label="Program Duration">
                      <Input placeholder="e.g. 1 Academic Year (4 Terms)" />
                    </Form.Item>
                  </div>
                ),
              },
              {
                key: '3',
                label: '🌟 3. 4 Core Learning Pillars',
                children: (
                  <div style={{ paddingTop: 8 }}>
                    <p style={{ color: '#64748B', fontSize: '0.84rem', marginBottom: 16 }}>
                      Define the 4 Core Learning Domains (NEP 2020 Aligned) displayed in colorful cards on the detail page.
                    </p>

                    <Form.List name="pillars">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Card
                              key={key}
                              size="small"
                              style={{ marginBottom: 12, borderRadius: 12, background: '#FAFAFA', border: '1px solid #E2E8F0' }}
                              extra={
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(name)}
                                >
                                  Remove
                                </Button>
                              }
                            >
                              <Row gutter={12}>
                                <Col span={4}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'number']}
                                    label="Number"
                                    rules={[{ required: true }]}
                                  >
                                    <Input placeholder="1" />
                                  </Form.Item>
                                </Col>
                                <Col span={10}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'title']}
                                    label="Pillar Title"
                                    rules={[{ required: true }]}
                                  >
                                    <Input placeholder="e.g. Sensory & Cognitive Lab" />
                                  </Form.Item>
                                </Col>
                                <Col span={5}>
                                  <Form.Item {...restField} name={[name, 'icon']} label="Icon">
                                    <Select options={ICON_OPTIONS} />
                                  </Form.Item>
                                </Col>
                                <Col span={5}>
                                  <Form.Item {...restField} name={[name, 'color']} label="Color">
                                    <Input placeholder="#FF5252" />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Form.Item
                                {...restField}
                                name={[name, 'desc']}
                                label="Description"
                                rules={[{ required: true }]}
                              >
                                <TextArea rows={2} placeholder="Detailed explanation of activities in this pillar..." />
                              </Form.Item>
                            </Card>
                          ))}

                          <Button
                            type="dashed"
                            onClick={() => add({ number: `${fields.length + 1}`, color: '#F7941D' })}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Learning Pillar
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </div>
                ),
              },
              {
                key: '4',
                label: '📚 4. 4-Term Curriculum',
                children: (
                  <div style={{ paddingTop: 8 }}>
                    <p style={{ color: '#64748B', fontSize: '0.84rem', marginBottom: 16 }}>
                      Quarterly syllabus modules (Term 1 to Term 4) displayed on the detail page.
                    </p>

                    <Form.List name="curriculum">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Card
                              key={key}
                              size="small"
                              style={{ marginBottom: 12, borderRadius: 12, background: '#FAFAFA', border: '1px solid #E2E8F0' }}
                              extra={
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(name)}
                                >
                                  Remove
                                </Button>
                              }
                            >
                              <Form.Item
                                {...restField}
                                name={[name, 'step']}
                                label="Term Title & Theme"
                                rules={[{ required: true }]}
                              >
                                <Input placeholder="e.g. Term 1: Me, My Senses & Primary Colors" />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, 'details']}
                                label="Curriculum Details"
                                rules={[{ required: true }]}
                              >
                                <TextArea rows={2} placeholder="Key topics, letters, concepts taught in this term..." />
                              </Form.Item>
                            </Card>
                          ))}

                          <Button
                            type="dashed"
                            onClick={() => add({ step: `Term ${fields.length + 1}: ` })}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Term Module
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </div>
                ),
              },
              {
                key: '5',
                label: '🎯 5. Milestones',
                children: (
                  <div style={{ paddingTop: 8 }}>
                    <p style={{ color: '#64748B', fontSize: '0.84rem', marginBottom: 16 }}>
                      End-of-Year Developmental Milestones checklist achieved before progressing to the next grade.
                    </p>

                    <Form.List name="milestones">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div key={key} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                              <CheckCircleOutlined style={{ color: '#16A34A', fontSize: 16 }} />
                              <Form.Item
                                {...restField}
                                name={name}
                                style={{ flex: 1, margin: 0 }}
                                rules={[{ required: true, message: 'Enter milestone description' }]}
                              >
                                <Input placeholder="e.g. Speaks in 2-3 word coherent sentences" />
                              </Form.Item>
                              <Button
                                type="text"
                                danger
                                icon={<MinusCircleOutlined />}
                                onClick={() => remove(name)}
                              />
                            </div>
                          ))}

                          <Button
                            type="dashed"
                            onClick={() => add('')}
                            block
                            icon={<PlusOutlined />}
                            style={{ marginTop: 8 }}
                          >
                            Add Milestone Item
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </div>
                ),
              },
              {
                key: '6',
                label: '⏰ 6. Daily Routine',
                children: (
                  <div style={{ paddingTop: 8 }}>
                    <p style={{ color: '#64748B', fontSize: '0.84rem', marginBottom: 16 }}>
                      "A Joyful Day in Our Classroom" daily schedule timeline cards.
                    </p>

                    <Form.List name="dailyRoutine">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Card
                              key={key}
                              size="small"
                              style={{ marginBottom: 12, borderRadius: 12, background: '#FAFAFA', border: '1px solid #E2E8F0' }}
                              extra={
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(name)}
                                >
                                  Remove
                                </Button>
                              }
                            >
                              <Row gutter={12}>
                                <Col span={6}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'time']}
                                    label="Time Slot"
                                    rules={[{ required: true }]}
                                  >
                                    <Input placeholder="08:30 AM" />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'title']}
                                    label="Activity Name"
                                    rules={[{ required: true }]}
                                  >
                                    <Input placeholder="Welcome Circle & Attendance" />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item {...restField} name={[name, 'icon']} label="Icon">
                                    <Select options={ICON_OPTIONS} />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Form.Item {...restField} name={[name, 'desc']} label="Activity Description">
                                <TextArea rows={2} placeholder="What kids do during this time slot..." />
                              </Form.Item>
                            </Card>
                          ))}

                          <Button
                            type="dashed"
                            onClick={() => add({ time: '09:00 AM', icon: 'SmileOutlined' })}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Daily Routine Slot
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </div>
                ),
              },
            ]}
          />
        </Form>
      </Drawer>
    </div>
  );
}
