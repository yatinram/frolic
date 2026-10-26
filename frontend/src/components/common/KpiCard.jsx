import React from 'react';
import { Card, Skeleton, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

/**
 * Reusable Frolic KPI Card Component
 *
 * @param {Object} props
 * @param {string|React.ReactNode} props.title - Title of the KPI metric
 * @param {string|number|React.ReactNode} props.value - Main KPI metric value
 * @param {React.ReactNode} [props.prefix] - Prefix symbol (e.g., '₹', '+')
 * @param {React.ReactNode} [props.suffix] - Suffix symbol (e.g., '%', 'users')
 * @param {React.ReactNode} [props.icon] - Icon component to display in the header badge
 * @param {string} [props.color='#F7941D'] - Primary accent color for borders, icon badges, and highlights
 * @param {string|React.ReactNode} [props.subtitle] - Subtitle / footer label
 * @param {string} [props.to] - Router path to link this KPI card to
 * @param {Object|string} [props.trend] - Trend data: { value: '+12%', isPositive: true, label: 'vs last month' }
 * @param {string|React.ReactNode} [props.badge] - Custom status badge text or element
 * @param {boolean} [props.loading=false] - Shows loading skeleton
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.variant='card'] - 'card' | 'gradient' | 'bordered' | 'minimal'
 * @param {Object} [props.style] - Custom container styles
 * @param {string} [props.className] - Custom container class
 */
export default function KpiCard({
  title,
  value,
  prefix,
  suffix,
  icon,
  color = '#F7941D',
  subtitle,
  to,
  trend,
  badge,
  loading = false,
  onClick,
  variant = 'card',
  style = {},
  className = '',
  ...restProps
}) {
  // Color presets & helper
  const isGradient = variant === 'gradient';
  const isBordered = variant === 'bordered';
  const isMinimal = variant === 'minimal';

  // Compute background & accent styles
  const cardStyle = {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: onClick || to ? 'pointer' : 'default',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
    border: isBordered ? `2px solid ${color}33` : '1px solid #F1F5F9',
    background: isGradient
      ? `linear-gradient(135deg, ${color}12 0%, #FFFFFF 100%)`
      : '#FFFFFF',
    borderLeft: !isBordered && !isMinimal ? `5px solid ${color}` : undefined,
    ...style,
  };

  const content = (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <>
          {/* Top Row: Title + Icon / Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#64748B',
                letterSpacing: '0.3px',
                lineHeight: 1.3,
              }}
            >
              {title}
            </span>

            {icon && (
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: `${color}18`,
                  color: color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                  transition: 'transform 0.3s ease',
                }}
              >
                {icon}
              </div>
            )}
          </div>

          {/* Main Metric Value Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 6,
              marginBottom: 6,
            }}
          >
            {prefix && (
              <span
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: color,
                }}
              >
                {prefix}
              </span>
            )}
            <span
              style={{
                fontSize: '1.85rem',
                fontWeight: 800,
                color: '#0F172A',
                fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                lineHeight: 1.1,
              }}
            >
              {value}
            </span>
            {suffix && (
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#94A3B8',
                }}
              >
                {suffix}
              </span>
            )}

            {/* Custom status tag if provided */}
            {badge && (
              <div style={{ marginLeft: 'auto' }}>
                {typeof badge === 'string' ? (
                  <Tag
                    color={color}
                    style={{
                      borderRadius: 8,
                      fontWeight: 700,
                      margin: 0,
                      border: 'none',
                    }}
                  >
                    {badge}
                  </Tag>
                ) : (
                  badge
                )}
              </div>
            )}
          </div>

          {/* Trend indicator or custom subtitle row */}
          {(trend || subtitle) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 10,
                paddingTop: 10,
                borderTop: '1px dashed #F1F5F9',
                fontSize: '0.82rem',
              }}
            >
              {trend && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    fontWeight: 700,
                    color: trend.isPositive !== false ? '#10B981' : '#EF4444',
                  }}
                >
                  {trend.isPositive !== false ? (
                    <ArrowUpOutlined style={{ fontSize: 11 }} />
                  ) : (
                    <ArrowDownOutlined style={{ fontSize: 11 }} />
                  )}
                  {trend.value || trend.text || trend}
                  {trend.label && (
                    <span style={{ color: '#94A3B8', fontWeight: 500, marginLeft: 4 }}>
                      {trend.label}
                    </span>
                  )}
                </span>
              )}

              {subtitle && (
                <div style={{ color: '#64748B', fontWeight: 600 }}>
                  {to ? (
                    <Link
                      to={to}
                      style={{
                        color: color,
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {subtitle}
                    </Link>
                  ) : (
                    subtitle
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  const cardElement = (
    <Card
      hoverable={Boolean(onClick || to)}
      style={cardStyle}
      className={`frolic-kpi-card ${className}`}
      onClick={onClick}
      bodyStyle={{ padding: '20px 22px' }}
      {...restProps}
    >
      {content}
    </Card>
  );

  if (to && !onClick) {
    return (
      <Link to={to} style={{ textDecoration: 'none', display: 'block' }}>
        {cardElement}
      </Link>
    );
  }

  return cardElement;
}

