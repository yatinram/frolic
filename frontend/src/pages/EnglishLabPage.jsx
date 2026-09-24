import React from 'react';
import EnglishLabExplorer from '../components/sections/EnglishLabExplorer';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useLanguage } from '../context/LanguageContext';
import FloatingEnquireBtn from '../components/common/FloatingEnquireBtn';
import WhatsAppBubble from '../components/common/WhatsAppBubble';

export default function EnglishLabPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div style={{ background: '#FFF8EF', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2E9BD6 0%, #1A7BB0 100%)',
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
            🔤 {t('nav.digitalEnglishLab', 'Proprietary Language Technology')}
          </span>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900 }}>
            {t('nav.englishLab', 'Frolic Digital Interactive English Lab (D.I.E.L.)')}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.95)', maxWidth: 720, margin: '12px auto 20px', fontSize: '1.15rem' }}>
            {t('home.programs.step5Desc', 'Transforming non-native speaking children into fluent, articulate English communicators within 3 to 5 years.')}
          </p>
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate(ROUTES.ADMISSION)}
            style={{ background: '#F5821F !important' }}
          >
            {t('common.enrolNow', 'Enroll in English Lab')} 🎒
          </Button>
        </div>
      </section>

      {/* Explorer Component with Echelons & Metrics */}
      <EnglishLabExplorer />

      <FloatingEnquireBtn />
      <WhatsAppBubble />
    </div>
  );
}
