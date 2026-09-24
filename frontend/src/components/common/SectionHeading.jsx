import React from 'react';
import { Tag } from 'antd';

export default function SectionHeading({
  eyebrow = '',
  title = '',
  highlight = '',
  subtitle = '',
  align = 'center',
  theme = 'orange', // orange, green, blue
  style = {},
}) {
  const getGradientClass = () => {
    if (theme === 'green') return 'gradient-text-green';
    if (theme === 'blue') return 'gradient-text-blue';
    return 'gradient-text-orange';
  };

  const getEyebrowColor = () => {
    if (theme === 'green') return '#4CAF3D';
    if (theme === 'blue') return '#2E9BD6';
    return '#F5821F';
  };

  return (
    <div
      style={{
        textAlign: align,
        marginBottom: 48,
        maxWidth: align === 'center' ? 820 : '100%',
        marginInline: align === 'center' ? 'auto' : undefined,
        ...style,
      }}
    >
      {eyebrow && (
        <div style={{ marginBottom: 14 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.95)',
              border: `1.5px solid ${getEyebrowColor()}`,
              color: getEyebrowColor(),
              padding: '6px 18px',
              borderRadius: 50,
              fontSize: '0.85rem',
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
            }}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.9rem)',
          marginBottom: 14,
          fontWeight: 800,
          color: '#222222',
        }}
      >
        {title}{' '}
        {highlight && (
          <span className={getGradientClass()}>{highlight}</span>
        )}
      </h2>

      {subtitle && (
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#666666',
            lineHeight: 1.7,
            fontWeight: 500,
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
