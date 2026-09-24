import React, { useState } from 'react';
import { Card, Select, Radio, Tag, Row, Col } from 'antd';
import { CalculatorOutlined, CheckCircleFilled, FormOutlined } from '@ant-design/icons';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const FEE_STRUCTURE = {
  'play-group': { name: 'Play Group', monthly: '₹2,500 – ₹3,500', quarterly: '₹7,000 – ₹9,500', annual: '₹26,000 – ₹35,000' },
  'nursery': { name: 'Nursery', monthly: '₹2,800 – ₹3,800', quarterly: '₹7,800 – ₹10,500', annual: '₹29,000 – ₹39,000' },
  'lkg': { name: 'LKG (with English & Maths Lab)', monthly: '₹3,200 – ₹4,200', quarterly: '₹9,000 – ₹12,000', annual: '₹34,000 – ₹45,000' },
  'ukg': { name: 'UKG (with English & Maths Lab)', monthly: '₹3,500 – ₹4,600', quarterly: '₹9,800 – ₹13,000', annual: '₹38,000 – ₹49,000' },
  'english-lab': { name: 'Digital English Lab Only (KG–Class 5)', monthly: '₹1,500 – ₹2,200', quarterly: '₹4,200 – ₹6,000', annual: '₹15,000 – ₹22,000' },
  'maths-lab': { name: 'Digital Maths Lab with Abacus (KG–Class 5)', monthly: '₹1,500 – ₹2,200', quarterly: '₹4,200 – ₹6,000', annual: '₹15,000 – ₹22,000' },
};

export default function FeeCalculator() {
  const [selectedProgram, setSelectedProgram] = useState('play-group');
  const [billingCycle, setBillingCycle] = useState('annual');
  const navigate = useNavigate();

  const currentPlan = FEE_STRUCTURE[selectedProgram] || FEE_STRUCTURE['play-group'];
  const estimatedFee = currentPlan[billingCycle];

  return (
    <section className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Transparent & Affordable Fee Estimator"
          title="Interactive"
          highlight="Fee Structure Calculator"
          subtitle="Estimate your investment in your child's early education and specialized digital learning lab."
          theme="green"
        />

        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <Card
            style={{
              borderRadius: 28,
              border: '1.5px solid rgba(76, 175, 61, 0.25)',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #F5FFF4 100%)',
              boxShadow: '0 16px 45px rgba(76, 175, 61, 0.12)',
            }}
            styles={{ body: { padding: 36 } }}
          >
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 800, fontSize: '0.95rem', color: '#3A3A3A', marginBottom: 10 }}>
                1. Select Desired Program or Lab:
              </label>
              <Select
                value={selectedProgram}
                onChange={setSelectedProgram}
                size="large"
                style={{ width: '100%' }}
                options={[
                  { value: 'play-group', label: '🎮 Play Group (Ages 1.5 – 2.5 Years)' },
                  { value: 'nursery', label: '🌱 Nursery (Ages 2.5 – 3.5 Years)' },
                  { value: 'lkg', label: '📚 LKG with DIEL & Abacus (Ages 3.5 – 4.5 Years)' },
                  { value: 'ukg', label: '⭐ UKG with DIEL & Abacus (Ages 4.5 – 5.5 Years)' },
                  { value: 'english-lab', label: '🔤 Digital English Lab Only (KG to Class 5)' },
                  { value: 'maths-lab', label: '➕ Digital Maths Lab with Abacus (KG to Class 5)' },
                ]}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontWeight: 800, fontSize: '0.95rem', color: '#3A3A3A', marginBottom: 10 }}>
                2. Select Preferred Payment Schedule:
              </label>
              <Radio.Group
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value)}
                size="large"
                buttonStyle="solid"
                style={{ display: 'flex', width: '100%', gap: 8 }}
              >
                <Radio.Button value="monthly" style={{ flex: 1, textAlign: 'center', borderRadius: 12 }}>
                  Monthly
                </Radio.Button>
                <Radio.Button value="quarterly" style={{ flex: 1, textAlign: 'center', borderRadius: 12 }}>
                  Quarterly (Save 8%)
                </Radio.Button>
                <Radio.Button value="annual" style={{ flex: 1, textAlign: 'center', borderRadius: 12 }}>
                  Annual Plan (Best Value)
                </Radio.Button>
              </Radio.Group>
            </div>

            {/* Estimated Output Panel */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                padding: '24px 20px',
                border: '2px solid #4CAF3D',
                boxShadow: '0 8px 24px rgba(76, 175, 61, 0.15)',
                textAlign: 'center',
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#777777', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Estimated Fee Range for {currentPlan.name}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
                  fontWeight: 900,
                  color: '#4CAF3D',
                  margin: '8px 0',
                }}
              >
                {estimatedFee}
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Tag color="green" style={{ borderRadius: 20, fontWeight: 700 }}>
                  <CheckCircleFilled /> Includes Digital Lab Software License
                </Tag>
                <Tag color="orange" style={{ borderRadius: 20, fontWeight: 700 }}>
                  <CheckCircleFilled /> Includes Pabulum® Workbooks
                </Tag>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Button
                variant="primary"
                size="large"
                icon={<FormOutlined />}
                onClick={() => navigate(`${ROUTES.ADMISSION}?program=${selectedProgram}`)}
                style={{ minWidth: 260 }}
              >
                Enquire for Official Fee Quote & Campus Visit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
