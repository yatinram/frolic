import React from 'react';
import MathsLabExplorer from '../components/sections/MathsLabExplorer';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useLanguage } from '../context/LanguageContext';
import FloatingEnquireBtn from '../components/common/FloatingEnquireBtn';
import WhatsAppBubble from '../components/common/WhatsAppBubble';

export default function MathsLabPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div style={{ background: '#FFF8EF', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #FDB913 0%, #F5821F 100%)',
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
            ➕ {t('nav.mathsLab', 'Dual-Brain Abacus & Digital Math')}
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900 }}>
            {t('nav.mathsLab', 'Frolic Digital Maths Lab with Abacus')}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.95)', maxWidth: 720, margin: '12px auto 20px', fontSize: '1.15rem' }}>
            {t('home.programs.step6Desc', 'Empowering students aged 4 to 11 with photographic numerical visualization and lightning mental arithmetic.')}
          </p>
          <Button
            variant="secondary"
            size="large"
            onClick={() => navigate(ROUTES.ADMISSION)}
            style={{ background: '#4CAF3D !important' }}
          >
            {t('common.enrolNow', 'Enroll in Maths Lab')} 🧮
          </Button>
        </div>
      </section>

      {/* Interactive Explorer */}
      <MathsLabExplorer />

      <FloatingEnquireBtn />
      <WhatsAppBubble />
    </div>
  );
}
