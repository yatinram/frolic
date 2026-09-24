import React from 'react';
import { Row, Col, Card, Tag } from 'antd';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const KIT_ITEMS = [
  { name: 'Ergonomic Backpack', tag: 'Durable & Light', icon: '🎒', color: '#F5821F' },
  { name: 'Branded Polo Collar Shirt', tag: '100% Breathable Cotton', icon: '👕', color: '#2E9BD6' },
  { name: 'Custom Activity Apron', tag: 'Mess-Free Art', icon: '🎨', color: '#4CAF3D' },
  { name: 'Comfort Denim Jeans', tag: 'Stretchy & Robust', icon: '👖', color: '#7B2D8B' },
  { name: 'Summer Shade Cap', tag: 'UV Protection', icon: '🧢', color: '#FDB913' },
  { name: 'Cotton Sports Socks', tag: 'Cushioned Comfort', icon: '🧦', color: '#E8453C' },
];

export default function GalleryPreview() {
  const navigate = useNavigate();

  return (
    <section className="section-padding" style={{ background: '#FFF8EF' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Branded Student Kits & Life at Frolic"
          title="Official Student Kit &"
          highlight="Classroom Visuals"
          subtitle="Every enrolled student receives the official Frolic branded uniform, accessories, and complete learning kit."
        />

        <Row gutter={[36, 36]} align="middle">
          {/* Kit Photo Card */}
          <Col xs={24} lg={12}>
            <div
              style={{
                position: 'relative',
                borderRadius: 28,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
                border: '4px solid #FFFFFF',
              }}
              className="interactive-card"
            >
              <img
                src="/assets/kits.jpeg"
                alt="Frolic Official Student Kit"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
                  padding: '24px 20px 16px',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: 800 }}>
                  Frolic Kids Official Kit
                </div>
                <div style={{ fontSize: '0.85rem', color: '#FDB913', fontWeight: 700 }}>
                  Included with every full-term enrollment
                </div>
              </div>
            </div>
          </Col>

          {/* Kit Breakdown Grid */}
          <Col xs={24} lg={12}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
              {KIT_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    padding: '16px',
                    borderRadius: 18,
                    border: `1.5px solid ${item.color}25`,
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                  className="interactive-card"
                >
                  <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#222222' }}>{item.name}</div>
                    <Tag color={item.color} style={{ borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, marginTop: 4 }}>
                      {item.tag}
                    </Tag>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14 }}>
              <Button
                variant="primary"
                size="large"
                onClick={() => navigate(ROUTES.GALLERY)}
              >
                View Full Media Gallery 📸
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}
