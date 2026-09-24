import React from 'react';
import { Row, Col, Space } from 'antd';
import {
  FormOutlined,
  ShopOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
  StarFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import Button from '../common/Button';

export default function JungleHero({
  title = 'Frolic Kids Edu Labs',
  tagline = 'Explore • Enrich • Experience',
  subtitle = "Let's create a space that gives freedom to explore, express and experience without burden of expectations and fear of making mistakes.",
  heroImage = '/assets/kits.jpeg',
}) {
  const navigate = useNavigate();

  return (
    <section className="jungle-hero-wrapper section-padding" style={{ paddingTop: 60, paddingBottom: 80 }}>
      {/* Background Sunray & Parallax Foliage Elements */}
      <div className="jungle-layer-bg">
        <div className="jungle-sunray" />
        <span className="jungle-leaf-1">🌿</span>
        <span className="jungle-leaf-2">🍃</span>
        <span className="jungle-leaf-3">🌱</span>
        <span className="jungle-butterfly-1">🦋</span>
        <span className="jungle-butterfly-2">✨</span>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <Row gutter={[48, 48]} align="middle">
          {/* Left Column: Headlines, Trust Signals, Dual CTAs */}
          <Col xs={24} lg={13}>
            {/* Eyebrow Trust Badge */}
            <div style={{ marginBottom: 18 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: '1.5px solid #F5821F',
                  color: '#F5821F',
                  padding: '8px 22px',
                  borderRadius: 50,
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  boxShadow: '0 8px 20px rgba(245, 130, 31, 0.15)',
                }}
                className="anim-bounce"
              >
                <StarFilled style={{ color: '#FDB913' }} />
                <span>Premier Digital Learning Lab & Preschool</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)',
                fontWeight: 900,
                color: '#222222',
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              Where Little Minds{' '}
              <span className="gradient-text-orange">Explore,</span>{' '}
              <span className="gradient-text-green">Enrich &</span>{' '}
              <span className="gradient-text-blue">Experience!</span>
            </h1>

            {/* Tagline Ribbon */}
            <div
              style={{
                fontFamily: "'Fredoka', cursive",
                fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
                color: '#4CAF3D',
                fontWeight: 600,
                marginBottom: 20,
                letterSpacing: '0.5px',
              }}
            >
              ✨ {tagline} ✨
            </div>

            {/* Subtitle Description */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                color: '#525252',
                lineHeight: 1.75,
                marginBottom: 32,
                maxWidth: 620,
                fontWeight: 500,
              }}
            >
              {subtitle}
            </p>

            {/* Highlights Micro-Bullets */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px 20px',
                marginBottom: 36,
              }}
            >
              {[
                '🔤 8000+ Words Digital English Lab',
                '➕ Abacus Dual-Brain Maths Lab',
                '🎒 Branded Kits & Safe Campus',
                '🏆 NCF 2023 & NEP 2020 Aligned',
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#333333',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  <CheckCircleFilled style={{ color: '#4CAF3D', fontSize: '1.1rem' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Dual CTAs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                size="large"
                icon={<FormOutlined />}
                onClick={() => navigate(ROUTES.ADMISSION)}
                style={{
                  height: 56,
                  paddingInline: 34,
                  fontSize: '1.12rem',
                }}
              >
                Enquire for Admission 🎒
              </Button>

              <Button
                variant="secondary"
                size="large"
                icon={<ShopOutlined />}
                onClick={() => navigate(ROUTES.FRANCHISE)}
                style={{
                  height: 56,
                  paddingInline: 30,
                  fontSize: '1.1rem',
                }}
              >
                Become a Franchise Partner 🏢
              </Button>
            </div>
          </Col>

          {/* Right Column: Composite Visual Frame with Real Kits & Student Badges */}
          <Col xs={24} lg={11}>
            <div style={{ position: 'relative', maxWidth: 520, margin: '0 auto' }}>
              {/* Floating Top Badge */}
              <div className="hero-floating-badge-1">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F5821F 0%, #FDB913 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '1.4rem',
                  }}
                >
                  🔤
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#222222' }}>
                    D.I.E.L. Platform
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#666666', fontWeight: 600 }}>
                    25,000+ Sentences
                  </div>
                </div>
              </div>

              {/* Main Visual Card */}
              <div className="hero-visual-card">
                <img
                  src={heroImage}
                  alt="Frolic Kids Uniform and Learning Kit"
                  className="hero-visual-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    right: 24,
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(12px)',
                    padding: '12px 18px',
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: '#F5821F', fontSize: '0.95rem' }}>
                      Frolic Official Student Kit
                    </div>
                    <div style={{ color: '#777777', fontSize: '0.78rem', fontWeight: 600 }}>
                      Bag • Apron • Polo • Jeans • Cap • Socks
                    </div>
                  </div>
                  <span style={{ fontSize: '1.4rem' }}>🎒</span>
                </div>
              </div>

              {/* Floating Bottom Badge */}
              <div className="hero-floating-badge-2">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4CAF3D 0%, #2E9BD6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontSize: '1.4rem',
                  }}
                >
                  ➕
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#222222' }}>
                    Maths Lab Abacus
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#666666', fontWeight: 600 }}>
                    Dual-Brain Mastery
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
