import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Tag, Breadcrumb } from 'antd';
import { ClockCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { blogService } from '../services';
import { ROUTES } from '../constants/routes';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/common/Button';
import FloatingEnquireBtn from '../components/common/FloatingEnquireBtn';
import WhatsAppBubble from '../components/common/WhatsAppBubble';
import { FrolicButton } from '../components/ui';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    blogService
      .getBySlug(slug)
      .then((res) => {
        if (res.success && res.data) {
          setBlog(res.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#F5821F', fontWeight: 800 }}>Loading educational article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ minHeight: '70vh', textAlign: 'center', padding: '100px 20px' }}>
        <h2>Article Not Found</h2>
        <Button variant="primary" onClick={() => navigate(ROUTES.BLOG)} style={{ marginTop: 20 }}>
          Back to Blog List
        </Button>
      </div>
    );
  }

  return (
    <div style={{ background: '#FFF8EF', minHeight: '100vh', padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Breadcrumb
          style={{ marginBottom: 24, fontWeight: 600 }}
          items={[
            { title: <Link to={ROUTES.HOME}>Home</Link> },
            { title: <Link to={ROUTES.BLOG}>Blog</Link> },
            { title: blog.title },
          ]}
        />

        <Card
          style={{
            borderRadius: 28,
            overflow: 'hidden',
            border: '1.5px solid rgba(0,0,0,0.06)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.06)',
            background: '#FFFFFF',
          }}
          cover={
            blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                style={{ width: '100%', height: 380, objectFit: 'cover' }}
              />
            )
          }
          styles={{ body: { padding: '36px 32px' } }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <Tag color="orange" style={{ borderRadius: 12, padding: '4px 12px', fontWeight: 700 }}>
              {blog.category}
            </Tag>
            <span style={{ color: '#888888', fontSize: '0.85rem' }}>
              <ClockCircleOutlined /> {blog.readTime || '4 min read'}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#222222', marginBottom: 20 }}>
            {blog.title}
          </h1>

          <div
            style={{
              fontSize: '1.05rem',
              color: '#444444',
              lineHeight: 1.85,
              borderTop: '1px solid #F0F0F0',
              paddingTop: 24,
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div style={{ marginTop: 40, borderTop: '1px solid #F0F0F0', paddingTop: 24, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          
            <FrolicButton to={ROUTES.BLOG} variant="secondary" size="small" style={{ fontWeight: 600,padding: '6px 16px', fontSize: '0.9rem' }}>
              <ArrowLeftOutlined/> {t('blogPage.backToBlogs', 'Back to Articles')}
            </FrolicButton>
          </div>
        </Card>
      </div>

      <FloatingEnquireBtn />
      <WhatsAppBubble />
    </div>
  );
}
