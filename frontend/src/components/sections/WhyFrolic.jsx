import React from 'react';
import { Row, Col, Card } from 'antd';
import SectionHeading from '../common/SectionHeading';
import PremiumIconBadge from '../common/PremiumIconBadge';

const WHY_FROLIC_ITEMS = [
  {
    iconName: 'LaptopOutlined',
    theme: 'orange',
    title: 'Digital Interactive Learning Labs',
    desc: 'Unlike passive rote learning, our D.I.E.L. software & Maths Lab present dynamic multimedia challenges that keep young learners actively engaged for longer spans.',
  },
  {
    iconName: 'UserOutlined',
    theme: 'green',
    title: 'Personalised Learning Pace',
    desc: 'Every child develops uniquely. Our learning lab software adapts to each child’s rhythm, encouraging self-paced exploration and zero anxiety.',
  },
  {
    iconName: 'BulbOutlined',
    theme: 'yellow',
    title: 'Multi-Sensory Cognitive Retention',
    desc: 'By integrating synchronized sound, responsive visuals, tactile abacus beads, and physical workbooks, memory retention increases up to 4x.',
  },
  {
    iconName: 'TeamOutlined',
    theme: 'blue',
    title: 'Trained & Certified Mentors',
    desc: 'Educators undergo our 12-module mentoring program designed by pedagogy expert Gaurang Oza, mastering child psychology and modern teaching methods.',
  },
  {
    iconName: 'SafetyCertificateOutlined',
    theme: 'purple',
    title: 'NEP 2020 & NCF 2023 Aligned',
    desc: 'All developmental milestones and lab modules strictly comply with the National Education Policy 2020 and National Curriculum Framework 2023 standards.',
  },
  {
    iconName: 'RiseOutlined',
    theme: 'red',
    title: 'Periodic Digital Progress Reports',
    desc: 'Parents receive comprehensive periodic assessments measuring vocabulary growth, speech articulation, and arithmetic fluency.',
  },
];

export default function WhyFrolic() {
  return (
    <section className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Why Choose Frolic"
          title="Transforming Early Education Through"
          highlight="Innovative Learning Labs"
          subtitle="We move beyond conventional preschools by providing a technology-augmented, child-centric boutique learning laboratory."
        />

        <Row gutter={[28, 28]}>
          {WHY_FROLIC_ITEMS.map((item, idx) => (
            <Col xs={24} sm={12} lg={8} key={idx}>
              <Card
                style={{
                  height: '100%',
                  borderRadius: 24,
                  border: '1.5px solid rgba(245, 130, 31, 0.12)',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8EF 100%)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="interactive-card"
                styles={{ body: { padding: 32 } }}
              >
                <div style={{ marginBottom: 20 }}>
                  <PremiumIconBadge
                    iconName={item.iconName}
                    theme={item.theme}
                    size={64}
                    fontSize={30}
                  />
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: 12,
                    color: '#222222',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#666666',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
