import React from 'react';
import { Row, Col } from 'antd';
import {
  SafetyOutlined,
  EyeOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import PremiumIconBadge from '../common/PremiumIconBadge';

const SAFE_HANDS_FEATURES = [
  {
    iconName: 'EyeOutlined',
    theme: 'orange',
    title: 'CCTV Surveillance',
    desc: 'Round-the-clock camera monitoring ensuring complete transparency and parent peace of mind.',
  },
  {
    iconName: 'SafetyOutlined',
    theme: 'green',
    title: 'Child-Proof Architecture',
    desc: 'Rounded furniture corners, non-toxic materials, anti-skid flooring, and secure finger-guards.',
  },
  {
    iconName: 'HeartOutlined',
    theme: 'red',
    title: 'Verified & Caring Staff',
    desc: '100% police background verified caregivers and dedicated support personnel.',
  },
  {
    iconName: 'MedicineBoxOutlined',
    theme: 'blue',
    title: 'Hygiene & First-Aid',
    desc: 'Daily sterilization cycles, pediatric first-aid trained mentors, and emergency protocols.',
  },
];

export default function SafeHandsStrip() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #1C2430 0%, #151A22 100%)',
        color: '#FFFFFF',
        padding: '70px 0',
        position: 'relative',
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(76, 175, 61, 0.18)',
              border: '1.5px solid #4CAF3D',
              color: '#4CAF3D',
              padding: '6px 18px',
              borderRadius: 50,
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            🛡️ Parent Trust & Assurance
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>
            Your Child is in <span style={{ color: '#F5821F' }}>Safe & Loving Hands</span>
          </h2>
          <p style={{ color: '#A0AEC0', maxWidth: 650, margin: '0 auto', fontSize: '1rem' }}>
            We uphold the highest protocols of safety, hygiene, emotional security, and campus surveillance.
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {SAFE_HANDS_FEATURES.map((feat, idx) => (
            <Col xs={24} sm={12} lg={6} key={idx}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 20,
                  padding: 24,
                  height: '100%',
                  transition: 'all 0.3s ease',
                }}
                className="interactive-card"
              >
                <div style={{ marginBottom: 16 }}>
                  <PremiumIconBadge
                    iconName={feat.iconName}
                    theme={feat.theme}
                    size={56}
                    fontSize={26}
                  />
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 800, marginBottom: 8 }}>
                  {feat.title}
                </h4>
                <p style={{ color: '#CBD5E0', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
