import React from 'react';
import TeacherTrainingExplorer from '../components/sections/TeacherTrainingExplorer';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useLanguage } from '../context/LanguageContext';
import FloatingEnquireBtn from '../components/common/FloatingEnquireBtn';
import WhatsAppBubble from '../components/common/WhatsAppBubble';

export default function TeacherTrainingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div style={{ background: '#FFF8EF', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #7B2D8B 0%, #2E9BD6 100%)',
          color: '#FFFFFF',
          padding: '70px 0 50px',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.22)',
              padding: '6px 18px',
              borderRadius: 50,
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: 12,
              display: 'inline-block',
            }}
          >
            👩‍🏫 {t('nav.teacherTraining', 'Mentoring Mentors Certification')}
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900 }}>
            {t('nav.teacherTraining', 'Teacher Training & Mentorship Program')}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.95)', maxWidth: 720, margin: '12px auto 20px', fontSize: '1.15rem' }}>
            {t('home.educators.quote', 'A comprehensive 12-module professional development course authored by Gaurang Oza, aligned with NEP 2020 and NCF 2023.')}
          </p>
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate(ROUTES.CONTACT)}
          >
            {t('common.enrolNow', 'Apply for Educator Training')} 🎓
          </Button>
        </div>
      </section>

      {/* Explorer Component */}
      <TeacherTrainingExplorer />

      <FloatingEnquireBtn />
      <WhatsAppBubble />
    </div>
  );
}
