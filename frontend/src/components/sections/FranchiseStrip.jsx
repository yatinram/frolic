import React from 'react';
import { Row, Col } from 'antd';
import { ShopOutlined, CheckCircleFilled, RocketOutlined } from '@ant-design/icons';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function FranchiseStrip() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #F5821F 0%, #E8453C 100%)',
        color: '#FFFFFF',
        padding: '70px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background glow circles */}
      <div style={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.12)' }} />
      <div style={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <Row gutter={[36, 36]} align="middle" justify="space-between">
          <Col xs={24} lg={15}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255, 255, 255, 0.22)',
                padding: '6px 18px',
                borderRadius: 50,
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              🏢 Business & Education Partnership
            </span>

            <h2
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: 14,
              }}
            >
              Start a Profitable <span style={{ color: '#FDB913' }}>Frolic Kids Edu Lab</span> in Your City!
            </h2>

            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 20, maxWidth: 680 }}>
              Join India's emerging boutique learning lab network. Get complete curriculum licenses, D.I.E.L. software, 12-module teacher mentoring, and turnkey marketing support.
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['Low Initial Capital', '3-in-1 Revenue Model', 'End-to-End Mentor Training', 'Exclusive Territory'].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem', fontWeight: 700 }}>
                  <CheckCircleFilled style={{ color: '#FDB913' }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </Col>

          <Col xs={24} lg={9} style={{ textAlign: 'center' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(16px)',
                borderRadius: 24,
                padding: '30px 24px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8 }}>
                Ready to become a partner?
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: 20 }}>
                Speak directly with our expansion directors today.
              </p>
              <Button
                variant="outline"
                size="large"
                icon={<RocketOutlined />}
                onClick={() => navigate(ROUTES.FRANCHISE)}
                style={{
                  background: '#FFFFFF !important',
                  color: '#F5821F !important',
                  border: 'none !important',
                  width: '100%',
                  height: 52,
                  fontSize: '1.05rem',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2) !important',
                }}
              >
                Apply for Franchise 🚀
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
