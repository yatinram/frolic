import React from 'react';
import { Card, Tag } from 'antd';
import { ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import PremiumIconBadge from '../common/PremiumIconBadge';
import Button from '../common/Button';

export default function ProgramCard({
  title,
  ageGroup,
  tagline,
  iconName = 'BookOutlined',
  theme = 'orange',
  accentColor = '#F5821F',
  description,
  features = [],
  onEnquire,
  onLearnMore,
}) {
  return (
    <Card
      style={{
        height: '100%',
        borderRadius: 24,
        border: `1.5px solid ${accentColor}25`,
        background: '#FFFFFF',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="interactive-card"
      styles={{ body: { padding: 30, display: 'flex', flexDirection: 'column', flex: 1 } }}
    >
      {/* Top Accent Strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          background: accentColor,
        }}
      />

      <div>
        {/* Header with Icon & Age Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <PremiumIconBadge
            iconName={iconName}
            theme={theme}
            size={60}
            fontSize={28}
          />
          <Tag
            color={accentColor}
            style={{
              borderRadius: 50,
              padding: '4px 14px',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '0.82rem',
              border: 'none',
              boxShadow: `0 4px 10px ${accentColor}30`,
            }}
          >
            {ageGroup}
          </Tag>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#222222',
            marginBottom: 6,
          }}
        >
          {title}
        </h3>

        {tagline && (
          <div
            style={{
              color: accentColor,
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: 14,
              fontFamily: "'Fredoka', sans-serif",
            }}
          >
            {tagline}
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: '0.92rem',
            color: '#555555',
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          {description}
        </p>

        {/* Feature Bullets */}
        {features.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {features.map((feat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#444444',
                }}
              >
                <CheckCircleFilled style={{ color: accentColor, fontSize: '0.95rem' }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #F0F0F0' }}>
        <Button
          variant="primary"
          size="small"
          onClick={onEnquire}
          style={{
            flex: 1,
            background: `linear-gradient(135deg, ${accentColor}, #E06B08)`,
            boxShadow: `0 6px 18px ${accentColor}40`,
          }}
        >
          Enroll 🎒
        </Button>
        {onLearnMore && (
          <Button
            variant="outline"
            size="small"
            onClick={onLearnMore}
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Details <ArrowRightOutlined />
          </Button>
        )}
      </div>
    </Card>
  );
}
