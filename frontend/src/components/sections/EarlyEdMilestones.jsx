import React from 'react';
import { Row, Col, Card } from 'antd';
import SectionHeading from '../common/SectionHeading';
import PremiumIconBadge from '../common/PremiumIconBadge';

const MILESTONES = [
  {
    iconName: 'SmileOutlined',
    theme: 'red',
    domain: 'Physical & Motor Agility',
    ageGroup: 'Ages 1.5 – 5.5',
    desc: 'Fine motor grip for writing, spatial balance, eye-hand coordination through sensory sand tables, bead threading, and obstacle climbing.',
    bullets: ['Pencil grip mastery', 'Spatial body balance', 'Bilateral coordination'],
  },
  {
    iconName: 'BulbOutlined',
    theme: 'yellow',
    domain: 'Cognitive & Analytical Logic',
    ageGroup: 'Ages 2.5 – 5.5',
    desc: 'Abacus bead calculations, pattern recognition, cause-and-effect science experiments, and problem-solving reasoning.',
    bullets: ['Dual-hemisphere brain balance', 'Classification & sorting', 'Spatial geometric visualization'],
  },
  {
    iconName: 'HeartOutlined',
    theme: 'green',
    domain: 'Social-Emotional Intelligence',
    ageGroup: 'Ages 1.5 – 5.5',
    desc: 'Empathetic sharing, resolving peer conflicts, understanding personal boundaries, emotional self-regulation, and public confidence.',
    bullets: ['Collaborative circle play', 'Expressing emotions safely', 'Confidence in unfamiliar settings'],
  },
  {
    iconName: 'TranslationOutlined',
    theme: 'blue',
    domain: 'Linguistic & Articulation Fluency',
    ageGroup: 'Ages 2.5 – 5.5',
    desc: 'Mastery of 44 phonemes, expanding 8000+ vocabulary words, sentence construction, clear diction, and dramatic storytelling.',
    bullets: ['Authentic native pronunciation', 'Sight-word automaticity', 'Public presentation & elocution'],
  },
];

export default function EarlyEdMilestones() {
  return (
    <section className="section-padding" style={{ background: '#FFF8EF' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Developmental Milestones"
          title="Significance of"
          highlight="Early Childhood Education"
          subtitle="90% of a child’s brain develops before age 6. Our structured learning labs address every crucial developmental domain."
        />

        <Row gutter={[24, 24]}>
          {MILESTONES.map((ms, idx) => (
            <Col xs={24} sm={12} lg={6} key={idx}>
              <Card
                style={{
                  height: '100%',
                  borderRadius: 24,
                  border: '1.5px solid rgba(245, 130, 31, 0.15)',
                  background: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                }}
                className="interactive-card"
                styles={{ body: { padding: 26 } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <PremiumIconBadge
                    iconName={ms.iconName}
                    theme={ms.theme}
                    size={54}
                    fontSize={24}
                  />
                  <span
                    style={{
                      background: 'rgba(0, 0, 0, 0.04)',
                      padding: '4px 10px',
                      borderRadius: 20,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#777777',
                    }}
                  >
                    {ms.ageGroup}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#222222', marginBottom: 10 }}>
                  {ms.domain}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#666666', lineHeight: 1.65, marginBottom: 16 }}>
                  {ms.desc}
                </p>

                <div style={{ borderTop: '1px dashed #EAEAEA', paddingTop: 14 }}>
                  {ms.bullets.map((b, i) => (
                    <div key={i} style={{ fontSize: '0.8rem', color: '#444444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ color: '#F5821F' }}>✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
