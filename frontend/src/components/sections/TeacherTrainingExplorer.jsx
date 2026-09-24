import React from 'react';
import { Row, Col, Card, Tag } from 'antd';
import { TeamOutlined, CheckCircleFilled, TrophyOutlined } from '@ant-design/icons';
import SectionHeading from '../common/SectionHeading';
import PremiumIconBadge from '../common/PremiumIconBadge';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const MODULES = [
  { id: 1, title: 'Introduction to English Language Learning', theme: 'orange', desc: 'Importance of early childhood language development & global communication.' },
  { id: 2, title: 'Foundational Literacy & Phonics', theme: 'green', desc: 'Techniques for teaching 44 phonemes and integrating digital lab tools.' },
  { id: 3, title: 'Multilingual Education Transitions', theme: 'blue', desc: 'Promoting mother tongue support while transitioning smoothly to English.' },
  { id: 4, title: 'Cognitive Development Activities', theme: 'yellow', desc: 'Exercises to stimulate critical thinking and open-ended problem solving.' },
  { id: 5, title: 'Social & Emotional Intelligence', theme: 'purple', desc: 'Building emotional regulation, empathy, and positive peer interactions.' },
  { id: 6, title: 'Pedagogical Approaches (Play-Based)', theme: 'red', desc: 'Child-centred, anxiety-free methods that remove the fear of making mistakes.' },
  { id: 7, title: 'Formative & Summative Assessments', theme: 'orange', desc: 'Using continuous observational assessments to guide individual instruction.' },
  { id: 8, title: 'Technology & Digital Lab Integration', theme: 'blue', desc: 'Mastering D.I.E.L. software, abacus labs, and multimedia presentation.' },
  { id: 9, title: 'Parental Involvement & Home Support', theme: 'green', desc: 'Engaging parents constructively with home strategies and progress reports.' },
  { id: 10, title: 'Curriculum Design (NCF 2023 / NEP 2020)', theme: 'purple', desc: 'Aligning classroom objectives with National Curriculum Framework standards.' },
  { id: 11, title: 'Classroom Safety & Behavior Management', theme: 'red', desc: 'Creating a positive, peaceful, and respectful learning environment.' },
  { id: 12, title: 'Ethical & Professional Conduct', theme: 'yellow', desc: 'Upholding highest pedagogical ethics, child safeguarding, and mentorship.' },
];

export default function TeacherTrainingExplorer() {
  const navigate = useNavigate();

  return (
    <section className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Mentoring Mentors"
          title="Frolic Teacher"
          highlight="Training & Mentoring Program"
          subtitle="Designed by Gaurang Oza — Equipping educators with modern pedagogical strategies, child psychology insights, and digital lab mastery."
          theme="blue"
        />

        {/* NCF & NEP Badges */}
        <div style={{ textAlign: 'center', marginBottom: 40, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Tag color="#7B2D8B" style={{ borderRadius: 50, padding: '6px 18px', fontWeight: 800, fontSize: '0.88rem' }}>
            🇮🇳 Aligned with NEP 2020 Goals
          </Tag>
          <Tag color="#2E9BD6" style={{ borderRadius: 50, padding: '6px 18px', fontWeight: 800, fontSize: '0.88rem' }}>
            📋 Compliant with NCF 2023 Framework
          </Tag>
          <Tag color="#4CAF3D" style={{ borderRadius: 50, padding: '6px 18px', fontWeight: 800, fontSize: '0.88rem' }}>
            🎓 Pedagogical Associate: Manovikas Mulyankan Sanstha
          </Tag>
        </div>

        <Row gutter={[20, 20]}>
          {MODULES.map((mod) => (
            <Col xs={24} sm={12} md={8} lg={6} key={mod.id}>
              <Card
                style={{
                  height: '100%',
                  borderRadius: 20,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8EF 100%)',
                }}
                className="interactive-card"
                styles={{ body: { padding: 22 } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F5821F, #FDB913)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                    }}
                  >
                    {mod.id < 10 ? `0${mod.id}` : mod.id}
                  </span>
                  <Tag color="orange" style={{ borderRadius: 12, fontSize: '0.72rem', fontWeight: 700 }}>
                    Module {mod.id}
                  </Tag>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#222222', marginBottom: 8, lineHeight: 1.35 }}>
                  {mod.title}
                </h4>

                <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.6, margin: 0 }}>
                  {mod.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate(ROUTES.TEACHER_TRAINING)}
          >
            Learn More About Teacher Certification →
          </Button>
        </div>
      </div>
    </section>
  );
}
