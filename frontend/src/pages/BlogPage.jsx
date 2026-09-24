import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tag } from 'antd';
import { ClockCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../services';
import { useLanguage } from '../context/LanguageContext';
import FloatingEnquireBtn from '../components/common/FloatingEnquireBtn';
import WhatsAppBubble from '../components/common/WhatsAppBubble';
import WaveDivider from '../components/common/WaveDivider';

const STARTER_BLOGS = [
  {
    id: 1,
    title: 'Why Digital Interactive Learning Works for Preschoolers',
    slug: 'why-digital-interactive-learning-works-for-preschoolers',
    summary: 'Explore how multi-sensory interactive education outperforms passive screen time and traditional rote learning in early childhood.',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    category: 'Pedagogy',
    readTime: '4 min read',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Play Group vs Nursery vs LKG — What is the Difference?',
    slug: 'play-group-vs-nursery-vs-lkg-difference',
    summary: 'A comprehensive age-wise milestone roadmap for parents seeking the right starting point for their little learner.',
    coverImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800',
    category: 'Parenting Guide',
    readTime: '5 min read',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'The Dual-Brain Benefit of Abacus-Integrated Maths Labs',
    slug: 'dual-brain-benefit-abacus-maths-labs',
    summary: 'How combining physical bead movement with mental visualization stimulates both left and right cerebral hemispheres.',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    category: 'Cognitive Science',
    readTime: '4 min read',
    publishedAt: new Date().toISOString(),
  },
];

export default function BlogPage() {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState(STARTER_BLOGS);
  const navigate = useNavigate();

  useEffect(() => {
    blogService
      .getAll()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setBlogs(res.data);
        }
      })
      .catch(() => { });
  }, []);

  return (
    <div style={{ background: '#FFF8EF', minHeight: '100vh', paddingBottom: 80 }}>
      <style>{`
        @keyframes floatBounce {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-16px) rotate(7deg); }
          66%       { transform: translateY(-7px) rotate(-4deg); }
        }
      `}</style>

      {/* ── Hero Banner ── */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #2E9BD6 0%, #7B2D8B 100%)',
          color: '#FFFFFF',
          padding: '120px 0 0',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Dot texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Floating emojis */}
        {['📖', '✏️', '💡', '🎓', '📚', '🧠', '🌟', '📝'].map((e, i) => (
          <span key={i} aria-hidden="true" style={{
            position: 'absolute',
            fontSize: i % 2 === 0 ? '2.2rem' : '1.6rem',
            opacity: 0.15,
            top: `${[10, 20, 60, 70, 35, 40, 80, 5][i]}%`,
            left: i < 4 ? `${[5, 88, 3, 90][i]}%` : undefined,
            right: i >= 4 ? `${[12, 10, 20, 40][i - 4]}%` : undefined,
            animation: `floatBounce ${5 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>{e}</span>
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 60 }}>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 900, textShadow: '0 4px 24px rgba(0,0,0,0.25)', marginBottom: 14 }}>
            {t('blogPage.title', 'Frolic Learning & Parenting Insights')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.92)', maxWidth: 720, margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
            {t('blogPage.subtitle', 'Expert advice, early childhood psychology, NEP 2020 insights, and fun at-home activities.')}
          </p>
        </div>

        {/* Wave bottom — blue-purple → cream */}
        <WaveDivider
          variant="wave2"
          topColor="transparent"
          bottomColor="#FFF8EF"
          height={64}
        />
      </section>

      <div className="container" style={{ marginTop: 60 }}>
        <Row gutter={[32, 32]}>
          {blogs.map((b) => (
            <Col xs={24} md={8} key={b.id}>
              <Card
                style={{
                  height: '100%',
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1.5px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                className="interactive-card"
                onClick={() => navigate(`/blog/${b.slug}`)}
                cover={
                  <div style={{ height: 220, overflow: 'hidden' }}>
                    <img
                      src={b.coverImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'}
                      alt={b.title}
                      style={{ width: '100%', height: 220, objectFit: 'cover' }}
                    />
                  </div>
                }
                styles={{ body: { padding: 24, display: 'flex', flexDirection: 'column', flex: 1 } }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Tag color="blue" style={{ borderRadius: 12, fontWeight: 700 }}>
                      {b.category || 'Education'}
                    </Tag>
                    <span style={{ fontSize: '0.8rem', color: '#888888', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <ClockCircleOutlined /> {b.readTime || '4 min read'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#222222', marginBottom: 10, lineHeight: 1.35 }}>
                    {b.title}
                  </h3>

                  <p style={{ color: '#666666', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 18 }}>
                    {b.summary}
                  </p>
                </div>

                <div style={{ color: '#F5821F', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
                  <span>{t('blogPage.readArticle', 'Read Full Article')}</span>
                  <ArrowRightOutlined />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <FloatingEnquireBtn />
      <WhatsAppBubble />
    </div>
  );
}
