import React from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function WhatsAppBubble({
  phone = '917575008820',
  message = 'Hello Frolic Kids Edu Labs! I would like to enquire about admissions & programs.',
}) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <Tooltip title="Chat with Frolic Admissions" placement="left">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          boxShadow: '0 12px 30px rgba(37, 211, 102, 0.45)',
          zIndex: 998,
          border: '2.5px solid rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        className="anim-pulse-glow"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        }}
      >
        <WhatsAppOutlined />
      </a>
    </Tooltip>
  );
}
