import React, { useState } from 'react';
import { Row, Col, Card, Collapse, Tabs, Tag } from 'antd';
import {
  SoundOutlined,
  BookOutlined,
  ReadOutlined,
  EditOutlined,
  CheckCircleFilled,
  StarFilled,
  TranslationOutlined,
} from '@ant-design/icons';
import SectionHeading from '../common/SectionHeading';
import AnimatedCounter from '../common/AnimatedCounter';
import PremiumIconBadge from '../common/PremiumIconBadge';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function EnglishLabExplorer() {
  const navigate = useNavigate();

  const ECHELON_ITEMS = [
    {
      key: '1',
      label: (
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#2E9BD6' }}>
          🔊 Echelon 01: Begin to Read (44 Phonemes & Sight Words)
        </span>
      ),
      children: (
        <div style={{ padding: '8px 0' }}>
          <p style={{ color: '#555555', lineHeight: 1.7, marginBottom: 14 }}>
            Building the core science of reading. A <strong>phoneme</strong> is the smallest unit of spoken sound, while a <strong>grapheme</strong> is its visual letter representation.
          </p>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div style={{ background: '#F0F8FF', padding: 16, borderRadius: 14, borderLeft: '4px solid #2E9BD6' }}>
                <h5 style={{ fontWeight: 800, color: '#2E9BD6', margin: '0 0 4px' }}>Module 01: Sight Words</h5>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>High-frequency instant word recognition for accelerated reading speed. <em>(DIEL + 2 Workbooks)</em></p>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ background: '#F0F8FF', padding: 16, borderRadius: 14, borderLeft: '4px solid #4CAF3D' }}>
                <h5 style={{ fontWeight: 800, color: '#4CAF3D', margin: '0 0 4px' }}>Module 02: 44 Phonemes & Graphemes</h5>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Articulation rules, blend sounds, and phonemic awareness mapping. <em>(DIEL + 1 Workbook)</em></p>
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#F5821F' }}>
          🌍 Echelon 02: Exploring the World Around (Contextual Learning)
        </span>
      ),
      children: (
        <div style={{ padding: '8px 0' }}>
          <p style={{ color: '#555555', lineHeight: 1.7, marginBottom: 14 }}>
            Associative vocabulary expansion through everyday objects, nature, community helpers, and early encyclopaedic wonder.
          </p>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <div style={{ background: '#FFF8EF', padding: 16, borderRadius: 14, borderLeft: '4px solid #F5821F' }}>
                <h5 style={{ fontWeight: 800, color: '#F5821F', margin: '0 0 4px' }}>Module 01: My World in My Words</h5>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Word association, curiosity, and descriptive oral speaking. <em>(DIEL + 2 Workbooks)</em></p>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ background: '#FFF8EF', padding: 16, borderRadius: 14, borderLeft: '4px solid #FDB913' }}>
                <h5 style={{ fontWeight: 800, color: '#FDB913', margin: '0 0 4px' }}>Module 02: My Early Encyclopaedia</h5>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Rich knowledge on animals, universe, and society. <em>(DIEL + 2 Books & 4 Workbooks)</em></p>
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#7B2D8B' }}>
          📖 Echelon 03: The World of Imagination (150+ Stories Lab)
        </span>
      ),
      children: (
        <div style={{ padding: '8px 0' }}>
          <p style={{ color: '#555555', lineHeight: 1.7 }}>
            Over <strong>150 audio-visual stories</strong> and <strong>200 guided compositions</strong>. Children listen, comprehend, dramaticize, and write original narrative endings, nurturing deep creative empathy. <em>(DIEL + 2 Books & 2 Workbooks)</em>
          </p>
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#4CAF3D' }}>
          ✍️ Echelon 04: Grammar, Oratory & Composition
        </span>
      ),
      children: (
        <div style={{ padding: '8px 0' }}>
          <p style={{ color: '#555555', lineHeight: 1.7 }}>
            Structural syntax, tenses, sentence formation, elocution debates, plays, and essay writing on cultural and environmental topics. Reinforced by over 8000 advanced vocabulary words. <em>(DIEL + 4 Workbooks)</em>
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #F0F8FF 0%, #FFFFFF 100%)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Core Educational Differentiator"
          title="Frolic Digital"
          highlight="English Lab (D.I.E.L.)"
          subtitle="A breakthrough linguistic mastery program combining Digital Interactive Oral Exercises with 18 Pabulum® Workbooks for K.G. to Class 5."
          theme="blue"
        />

        {/* 4 Key Metric Counters */}
        <Row gutter={[20, 20]} style={{ marginBottom: 48 }}>
          <Col xs={12} sm={6}>
            <AnimatedCounter endValue={8000} suffix="+" label="Vocabulary Words" color="#2E9BD6" icon={<TranslationOutlined />} />
          </Col>
          <Col xs={12} sm={6}>
            <AnimatedCounter endValue={25000} suffix="+" label="Oral Practiced Sentences" color="#F5821F" icon={<SoundOutlined />} />
          </Col>
          <Col xs={12} sm={6}>
            <AnimatedCounter endValue={150} suffix="+" label="Listening Stories" color="#7B2D8B" icon={<BookOutlined />} />
          </Col>
          <Col xs={12} sm={6}>
            <AnimatedCounter endValue={18} suffix=" Bks" label="Pabulum® Workbooks" color="#4CAF3D" icon={<ReadOutlined />} />
          </Col>
        </Row>

        {/* Main Content Row: Accordion Echelons & 6 Benefits */}
        <Row gutter={[36, 36]} align="top">
          <Col xs={24} lg={13}>
            <Card
              style={{
                borderRadius: 24,
                border: '1.5px solid rgba(46, 155, 214, 0.2)',
                boxShadow: '0 12px 36px rgba(46, 155, 214, 0.08)',
                background: '#FFFFFF',
              }}
              styles={{ body: { padding: 32 } }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <PremiumIconBadge iconName="BookOutlined" theme="blue" size={48} fontSize={22} />
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#2E9BD6' }}>
                  Curriculum Echelons Explorer
                </h3>
              </div>

              <Collapse
                items={ECHELON_ITEMS}
                defaultActiveKey={['1']}
                expandIconPosition="end"
                style={{
                  background: 'transparent',
                  border: 'none',
                }}
              />
            </Card>
          </Col>

          {/* Right Column: 6 Benefits of English Lab */}
          <Col xs={24} lg={11}>
            <Card
              style={{
                borderRadius: 24,
                border: '1.5px solid rgba(245, 130, 31, 0.2)',
                boxShadow: '0 12px 36px rgba(245, 130, 31, 0.08)',
                background: '#FFFFFF',
              }}
              styles={{ body: { padding: 32 } }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <PremiumIconBadge iconName="StarFilled" theme="orange" size={48} fontSize={22} />
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#F5821F' }}>
                  6 Pillars of D.I.E.L. Fluency
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: 'Language Development', desc: 'Contextual video and audio exposure to authentic English pronunciation.' },
                  { title: 'Active Engagement', desc: 'Interactive exercises replace monotonous classroom rote learning.' },
                  { title: 'Multi-Sensory Learning', desc: 'Colourful graphics and sound effects cater to auditory and visual learners.' },
                  { title: 'Personalised Progression', desc: 'Children repeat lessons at their own comfort level without stigma.' },
                  { title: 'Real-World Connections', desc: 'Practical conversational dialogues connected to daily experiences.' },
                  { title: 'Periodic Digital Reports', desc: 'Objective automated reports documenting speaking fluency score.' },
                ].map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <CheckCircleFilled style={{ color: '#4CAF3D', fontSize: '1.1rem', marginTop: 3 }} />
                    <div>
                      <strong style={{ color: '#222222', fontSize: '0.92rem' }}>{b.title}:</strong>
                      <span style={{ color: '#666666', fontSize: '0.88rem', marginLeft: 6 }}>{b.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 28, textAlign: 'center' }}>
                <Button
                  variant="primary"
                  block
                  size="large"
                  onClick={() => navigate(ROUTES.ENGLISH_LAB)}
                >
                  Explore Complete English Lab Syllabus →
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
