import { Modal, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { toast } from '../../utils/premiumToast';
import Button from './Button';
import { useState } from 'react';

export default function AdminLoginModal({ open, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values);
      toast.success('Welcome to Frolic Admin Portal!', 'Login Successful');
      onClose();
      form.resetFields();
      navigate(ROUTES.ADMIN);
    } catch (err) {
      toast.error(err.message || 'Invalid admin credentials', 'Authentication Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      title={
        <div style={{ textAlign: 'center', padding: '10px 0 6px' }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F5821F 0%, #FDB913 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              color: '#FFFFFF',
              boxShadow: '0 10px 25px rgba(245, 130, 31, 0.35)',
              marginBottom: 12,
            }}
          >
            <SafetyCertificateOutlined />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>
            Frolic Admin Access
          </h3>
          <p style={{ margin: '4px 0 0', color: '#888888', fontSize: '0.85rem' }}>
            Authorized Management Portal
          </p>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          name="email"
          label={<span style={{ fontWeight: 700 }}>Email or Username</span>}
          rules={[{ required: true, message: 'Please enter admin email or username' }]}
        >
          <Input
            prefix={<MailOutlined style={{ color: '#F5821F' }} />}
            placeholder="admin@frolic.com"
            size="large"
            style={{ borderRadius: 12 }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span style={{ fontWeight: 700 }}>Password</span>}
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#F5821F' }} />}
            placeholder="••••••••"
            size="large"
            style={{ borderRadius: 12 }}
          />
        </Form.Item>

        <div style={{ marginTop: 24 }}>
          <Button
            variant="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Enter Dashboard
          </Button>
        </div>

      </Form>
    </Modal>
  );
}
