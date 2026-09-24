import React from 'react';
import { Button as AntButton } from 'antd';

export default function Button({
  variant = 'primary', // primary, secondary, outline, text
  size = 'large',
  children,
  icon,
  onClick,
  style = {},
  className = '',
  loading = false,
  htmlType = 'button',
  block = false,
}) {
  let buttonClass = 'frolic-btn-primary';
  if (variant === 'secondary') buttonClass = 'frolic-btn-secondary';
  if (variant === 'outline') buttonClass = 'frolic-btn-outline';

  return (
    <AntButton
      className={`${buttonClass} ${className}`}
      size={size}
      icon={icon}
      onClick={onClick}
      loading={loading}
      htmlType={htmlType}
      block={block}
      style={{
        paddingInline: size === 'large' ? 28 : 20,
        height: size === 'large' ? 48 : 38,
        fontSize: size === 'large' ? '1.02rem' : '0.92rem',
        ...style,
      }}
    >
      {children}
    </AntButton>
  );
}
