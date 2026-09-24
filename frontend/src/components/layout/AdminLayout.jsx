import React, { useState } from 'react';
import { Layout, Menu, Avatar, Space, Dropdown, message } from 'antd';
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  ShopOutlined,
  BookOutlined,
  StarOutlined,
  PictureOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    navigate(ROUTES.HOME);
    return null;
  }

  const menuItems = [
    { key: ROUTES.ADMIN, icon: <DashboardOutlined />, label: <Link to={ROUTES.ADMIN}>Dashboard</Link> },
    { key: ROUTES.ADMIN_ADMISSIONS, icon: <UsergroupAddOutlined />, label: <Link to={ROUTES.ADMIN_ADMISSIONS}>Admissions</Link> },
    { key: ROUTES.ADMIN_FRANCHISE, icon: <ShopOutlined />, label: <Link to={ROUTES.ADMIN_FRANCHISE}>Franchise Leads</Link> },
    { key: ROUTES.ADMIN_PROGRAMS, icon: <BookOutlined />, label: <Link to={ROUTES.ADMIN_PROGRAMS}>Programs & Labs</Link> },
    { key: ROUTES.ADMIN_PRODUCTS, icon: <ShoppingOutlined />, label: <Link to={ROUTES.ADMIN_PRODUCTS}>Products & Kits</Link> },
    { key: ROUTES.ADMIN_ORDERS, icon: <OrderedListOutlined />, label: <Link to={ROUTES.ADMIN_ORDERS}>Store Orders</Link> },
    { key: ROUTES.ADMIN_TESTIMONIALS, icon: <StarOutlined />, label: <Link to={ROUTES.ADMIN_TESTIMONIALS}>Testimonials</Link> },
    { key: ROUTES.ADMIN_GALLERY, icon: <PictureOutlined />, label: <Link to={ROUTES.ADMIN_GALLERY}>Media Gallery</Link> },
    { key: ROUTES.ADMIN_BLOGS, icon: <FileTextOutlined />, label: <Link to={ROUTES.ADMIN_BLOGS}>Blog Posts</Link> },
  ];

  const handleLogout = () => {
    logout();
    message.success('Logged out from Admin Portal');
    navigate(ROUTES.HOME);
  };

  const userDropdown = {
    items: [
      { key: 'home', icon: <HomeOutlined />, label: <Link to={ROUTES.HOME}>View Public Website</Link> },
      { type: 'divider' },
      { key: 'logout', icon: <LogoutOutlined />, label: 'Log Out', onClick: handleLogout, danger: true },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: '#1C2430',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        }}
        width={240}
      >
        <div style={{ padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <img
            src="/assets/logo.jpeg"
            alt="Frolic Admin"
            style={{ height: collapsed ? 36 : 48, borderRadius: 8, background: '#FFFFFF', padding: 2 }}
          />
          {!collapsed && (
            <div style={{ marginTop: 8, color: '#F5821F', fontWeight: 800, fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem' }}>
              Admin Management
            </div>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ background: 'transparent', padding: '12px 8px' }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#FFFFFF',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            height: 64,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '1.2rem', cursor: 'pointer', color: '#555555' }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#222222', fontFamily: "'Outfit', sans-serif" }}>
              Frolic Kids Edu Labs — Enterprise Dashboard
            </span>
          </div>

          <Space size="middle">
            <Link to={ROUTES.HOME} style={{ color: '#F5821F', fontWeight: 700, textDecoration: 'none' }}>
              <HomeOutlined /> Public Site
            </Link>

            <Dropdown menu={userDropdown} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar style={{ background: '#F5821F' }} icon={<UserOutlined />} />
                <span style={{ fontWeight: 700, color: '#333333' }}>{user?.name || 'Administrator'}</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ margin: '24px', padding: '24px', background: '#FFFFFF', borderRadius: 20, minHeight: 400, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
