import React from 'react';
import * as AntIcons from '@ant-design/icons';

const ICON_THEMES = {
  orange: {
    gradient: 'linear-gradient(135deg, #F5821F 0%, #FDB913 100%)',
    shadow: '0 12px 28px rgba(245, 130, 31, 0.35)',
    glow: 'rgba(245, 130, 31, 0.25)',
    color: '#FFFFFF',
  },
  green: {
    gradient: 'linear-gradient(135deg, #4CAF3D 0%, #2E9BD6 100%)',
    shadow: '0 12px 28px rgba(76, 175, 61, 0.35)',
    glow: 'rgba(76, 175, 61, 0.25)',
    color: '#FFFFFF',
  },
  blue: {
    gradient: 'linear-gradient(135deg, #2E9BD6 0%, #7B2D8B 100%)',
    shadow: '0 12px 28px rgba(46, 155, 214, 0.35)',
    glow: 'rgba(46, 155, 214, 0.25)',
    color: '#FFFFFF',
  },
  red: {
    gradient: 'linear-gradient(135deg, #E8453C 0%, #F5821F 100%)',
    shadow: '0 12px 28px rgba(232, 69, 60, 0.35)',
    glow: 'rgba(232, 69, 60, 0.25)',
    color: '#FFFFFF',
  },
  yellow: {
    gradient: 'linear-gradient(135deg, #FDB913 0%, #F5821F 100%)',
    shadow: '0 12px 28px rgba(253, 185, 19, 0.35)',
    glow: 'rgba(253, 185, 19, 0.25)',
    color: '#FFFFFF',
  },
  purple: {
    gradient: 'linear-gradient(135deg, #7B2D8B 0%, #E8453C 100%)',
    shadow: '0 12px 28px rgba(123, 45, 139, 0.35)',
    glow: 'rgba(123, 45, 139, 0.25)',
    color: '#FFFFFF',
  },
};

export default function PremiumIconBadge({
  iconName = 'SmileOutlined',
  customIcon = null,
  theme = 'orange',
  size = 60,
  fontSize = 28,
  className = '',
  style = {},
}) {
  const currentTheme = ICON_THEMES[theme] || ICON_THEMES.orange;
  const AntComponent = AntIcons[iconName] || AntIcons.SmileOutlined;

  return (
    <div
      className={`premium-icon-box ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        background: currentTheme.gradient,
        boxShadow: currentTheme.shadow,
        color: currentTheme.color,
        border: '2px solid rgba(255, 255, 255, 0.65)',
        ...style,
      }}
    >
      <div
        style={{
          fontSize: fontSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
          lineHeight: 1,
        }}
      >
        {customIcon || <AntComponent />}
      </div>
    </div>
  );
}
