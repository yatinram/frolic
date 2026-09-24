import React, { useState } from 'react';
import { Row, Col, Card, Tag, Steps } from 'antd';
import {
  CalculatorOutlined,
  CheckCircleFilled,
  ThunderboltOutlined,
  EyeOutlined,
  TrophyOutlined,
  RightOutlined,
} from '@ant-design/icons';
import SectionHeading from '../common/SectionHeading';
import PremiumIconBadge from '../common/PremiumIconBadge';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function MathsLabExplorer() {
  const navigate = useNavigate();
  const [activeBeads, setActiveBeads] = useState(5);

  const MATH_STEPS = [
    {
      title: 'Echelon 01: Numerical Counting & Calculations',
      description: 'Digits 1-100, decimal system, forward/backward counting, abacus single & 2-digit operations, multiplication as repeated addition. (5 Workbooks)',
    },
    {
      title: 'Echelon 02: Numerical Applications (Pragmatic Projects)',
      description: 'Time, length, weight, money transactions, budgeting, ratios, percentages, and data representation through graphs. (4 Workbooks & 2 Project Books)',
    },
    {
      title: 'Echelon 03: Practical Geometry & Spatial Reasoning',
      description: 'Identifying 2D and 3D shapes, angle measures, perimeter, area, and hands-on spatial problem solving. (2 Workbooks & 1 Project Book)',
    },
  ];

  return (
    <section className="section-padding" style={{ background: '#FFF8EF' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Dual-Brain Cognitive Development"
          title="Frolic Digital"
          highlight="Maths Lab with Abacus"
          subtitle="Combining physical abacus movement with interactive digital challenges for students aged 4 to 11 years."
          theme="orange"
        />

        <Row gutter={[36, 36]} align="middle">
          {/* Left Column: Interactive Abacus Beads Visualizer + Cognitive Pillars */}
          <Col xs={24} lg={11}>
            <Card
              style={{
                borderRadius: 24,
                border: '1.5px solid rgba(253, 185, 19, 0.3)',
                boxShadow: '0 12px 36px rgba(253, 185, 19, 0.12)',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF5 100%)',
                textAlign: 'center',
              }}
              styles={{ body: { padding: 32 } }}
            >
              <div style={{ marginBottom: 16 }}>
                <PremiumIconBadge iconName="CalculatorOutlined" theme="yellow" size={60} fontSize={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5821F', marginBottom: 6 }}>
                Interactive Abacus Bead Simulator
              </h3>
              <p style={{ color: '#666666', fontSize: '0.88rem', marginBottom: 20 }}>
                Click on the beads to experience how children transition from physical touch to mental calculation!
              </p>

              {/* Abacus Simulation Frame */}
              <div
                style={{
                  background: '#2B1A09',
                  borderRadius: 16,
                  padding: '20px 24px',
                  border: '4px solid #8D4F19',
                  boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.5)',
                  marginBottom: 20,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveBeads(idx + 1)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {/* Rod */}
                    <div style={{ width: 4, height: 110, background: '#C0C0C0', position: 'absolute', top: 0, zIndex: 1 }} />

                    {/* Upper Bead */}
                    <div
                      style={{
                        width: 28,
                        height: 20,
                        borderRadius: '50%',
                        background: idx < activeBeads ? 'linear-gradient(135deg, #FDB913, #F5821F)' : '#555555',
                        border: '1.5px solid #FFFFFF',
                        zIndex: 2,
                        marginBottom: 16,
                        boxShadow: idx < activeBeads ? '0 0 10px #FDB913' : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    />

                    {/* Lower Beads */}
                    {Array.from({ length: 4 }).map((_, bIdx) => (
                      <div
                        key={bIdx}
                        style={{
                          width: 28,
                          height: 18,
                          borderRadius: '50%',
                          background: (idx + bIdx) < activeBeads ? 'linear-gradient(135deg, #4CAF3D, #2E9BD6)' : '#444444',
                          border: '1px solid rgba(255, 255, 255, 0.6)',
                          zIndex: 2,
                          marginTop: 3,
                          transition: 'all 0.2s ease',
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ background: '#FFF8EF', padding: '10px 18px', borderRadius: 50, display: 'inline-block', fontWeight: 800, color: '#F5821F' }}>
                Bead Value Registered: {activeBeads * 12} ✨
              </div>
            </Card>
          </Col>

          {/* Right Column: 3 Structured Echelons Steps & Benefits */}
          <Col xs={24} lg={13}>
            <Card
              style={{
                borderRadius: 24,
                border: '1.5px solid rgba(245, 130, 31, 0.2)',
                boxShadow: '0 12px 36px rgba(245, 130, 31, 0.08)',
                background: '#FFFFFF',
              }}
              styles={{ body: { padding: 32 } }}
            >
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#222222', marginBottom: 20 }}>
                3-Tier Mathematical Mastery Echelons
              </h3>

              <Steps
                direction="vertical"
                current={3}
                items={MATH_STEPS.map((s, idx) => ({
                  title: <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: '#F5821F', fontSize: '1.05rem' }}>{s.title}</span>,
                  description: <span style={{ fontFamily: "'Nunito', sans-serif", color: '#555555', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.description}</span>,
                  icon: (
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F5821F, #FDB913)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                      }}
                    >
                      {idx + 1}
                    </div>
                  ),
                }))}
              />

              <div
                style={{
                  marginTop: 24,
                  padding: 16,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #F0F8FF, #E6F4FF)',
                  border: '1px solid #2E9BD630',
                }}
              >
                <h5 style={{ fontWeight: 800, color: '#2E9BD6', margin: '0 0 6px' }}>
                  🧠 Why Digital Maths Labs Make It Even Better:
                </h5>
                <p style={{ color: '#555555', fontSize: '0.85rem', margin: 0 }}>
                  Adaptive software tracks accuracy, speed, and cognitive calculation agility — giving children real-time feedback with zero stress.
                </p>
              </div>

              <div style={{ marginTop: 24 }}>
                <Button
                  variant="secondary"
                  block
                  size="large"
                  onClick={() => navigate(ROUTES.MATHS_LAB)}
                >
                  Explore Complete Maths Lab Curriculum →
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
