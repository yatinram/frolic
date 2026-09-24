import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';
import { ROUTES } from '../../constants/routes';

export default function FloatingEnquireBtn() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(ROUTES.ADMISSION)}
      style={{
        position: 'fixed',
        right: 0,
        top: '48%',
        transform: 'translateY(-50%)',
        zIndex: 999,
        background: 'linear-gradient(135deg, #F5821F 0%, #E06B08 100%)',
        color: '#FFFFFF',
        padding: '14px 18px',
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        boxShadow: '0 10px 30px rgba(245, 130, 31, 0.45)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 800,
        fontSize: '0.92rem',
        letterSpacing: '0.5px',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        border: '2px solid rgba(255, 255, 255, 0.4)',
        borderRight: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-50%) translateX(-6px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(245, 130, 31, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(-50%) translateX(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 130, 31, 0.45)';
      }}
    >
      <FormOutlined style={{ fontSize: '1.2rem', transform: 'rotate(90deg)' }} />
      <span>ENQUIRE FOR ADMISSION</span>
    </div>
  );
}
