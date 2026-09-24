import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const STRIP_ITEMS = [
  { label: 'Play Group', age: '1.5–2.5 Yrs', icon: '🎮', color: '#E8453C', path: ROUTES.PLAY_GROUP },
  { label: 'Nursery', age: '2.5–3.5 Yrs', icon: '🌱', color: '#4CAF3D', path: ROUTES.NURSERY },
  { label: 'LKG', age: '3.5–4.5 Yrs', icon: '📚', color: '#2E9BD6', path: ROUTES.LKG },
  { label: 'UKG', age: '4.5–5.5 Yrs', icon: '⭐', color: '#F5821F', path: ROUTES.UKG },
  { label: 'English Lab', age: 'KG to Class 5', icon: '🔤', color: '#2E9BD6', path: ROUTES.ENGLISH_LAB },
  { label: 'Maths Lab', age: 'KG to Class 5', icon: '➕', color: '#FDB913', path: ROUTES.MATHS_LAB },
];

export default function HighlightsStrip() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #FFF8EF 0%, #FFF0DE 100%)',
        padding: '24px 0',
        borderTop: '1px solid rgba(245, 130, 31, 0.15)',
        borderBottom: '1px solid rgba(245, 130, 31, 0.15)',
        boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.02)',
      }}
    >
      <div className="container">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          {STRIP_ITEMS.map((item, idx) => (
            <Col xs={12} sm={8} lg={4} key={idx}>
              <div
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: '#FFFFFF',
                  padding: '12px 16px',
                  borderRadius: 18,
                  border: `1.5px solid ${item.color}25`,
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="interactive-card"
              >
                <div
                  style={{
                    fontSize: '1.6rem',
                    lineHeight: 1,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      color: item.color,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: '0.74rem',
                      color: '#777777',
                      fontWeight: 700,
                    }}
                  >
                    {item.age}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
