import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarFilled, ArrowRightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import FrolicTag from './FrolicTag';
import s from './FrolicCard.module.scss';

/**
 * Universal Frolic Card Component
 *
 * @param {'default' | 'feature' | 'program' | 'testimonial' | 'stat' | 'contact' | 'activity'} [variant='default']
 * @param {boolean} [hoverable=true]
 * @param {'white' | 'peach' | 'mint' | 'sky' | 'butter' | string} [bg='white']
 * @param {'none' | 'sm' | 'md' | 'lg'} [padding='lg']
 * @param {'sm' | 'md' | 'lg' | 'card' | 'xl'} [radius='card']
 * @param {React.ReactNode} [icon]
 * @param {string} [iconColor]
 * @param {string} [iconBg]
 * @param {React.ReactNode} [title]
 * @param {React.ReactNode} [subtitle]
 * @param {React.ReactNode} [description]
 * @param {React.ReactNode} [badge]
 * @param {string} [badgeColor]
 * @param {string} [to]
 * @param {string} [href]
 * @param {number} [rating=5]
 * @param {string} [author]
 * @param {string} [subAuthor]
 * @param {string} [initials]
 * @param {string} [tag]
 * @param {string} [tagColor]
 * @param {number | string} [value]
 * @param {string} [suffix]
 * @param {string} [label]
 * @param {string} [color]
 * @param {string} [className]
 * @param {React.CSSProperties} [style]
 * @param {React.ReactNode} [children]
 */
export default function FrolicCard({
  variant = 'default',
  hoverable = true,
  bg = 'white',
  padding,
  radius = 'card',
  icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  description,
  badge,
  badgeColor,
  to,
  href,
  rating = 5,
  author,
  subAuthor,
  initials,
  tag,
  tagColor = '#F7941D',
  value,
  suffix = '',
  label,
  color,
  className = '',
  style = {},
  children,
  onClick,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine default padding based on variant
  const actualPadding = padding || (variant === 'contact' || variant === 'activity' ? 'md' : 'lg');

  const cardClasses = classNames(
    s.card,
    {
      [s['card--hoverable']]: hoverable,
      [s[`card--p-${actualPadding}`]]: actualPadding,
      [s[`card--bg-${bg}`]]: ['white', 'peach', 'mint', 'sky', 'butter'].includes(bg),
      [s[`card--r-${radius}`]]: radius,
    },
    s[variant],
    className
  );

  const customStyle = {
    ...style,
    ...(bg && !['white', 'peach', 'mint', 'sky', 'butter'].includes(bg) ? { backgroundColor: bg } : {}),
    ...(isHovered && color ? { borderColor: `${color}40` } : {}),
  };

  const renderContent = () => {
    switch (variant) {
      case 'feature':
        return (
          <>
            {icon && (
              <div
                className={s.feature__iconWrapper}
                style={{
                  backgroundColor: iconBg || `${iconColor || '#F7941D'}18`,
                  color: iconColor || '#F7941D',
                }}
              >
                {icon}
              </div>
            )}
            <div>
              {title && <h3 className={s.feature__title}>{title}</h3>}
              {description && <p className={s.feature__desc}>{description}</p>}
              {children}
            </div>
          </>
        );

      case 'program':
        return (
          <>
            <div className={s.program__top}>
              {icon && (
                <div
                  className={s.program__icon}
                  style={{
                    backgroundColor: iconBg || `${color || '#F7941D'}18`,
                    color: color || '#F7941D',
                  }}
                >
                  {icon}
                </div>
              )}
              {badge && <FrolicTag color={badgeColor || color || '#F7941D'}>{badge}</FrolicTag>}
            </div>
            {title && <h3 className={s.program__title}>{title}</h3>}
            {description && <p className={s.program__desc}>{description}</p>}
            {children}
            <div className={s.program__footer} style={{ color: color || '#F7941D' }}>
              <span>Learn More</span> <ArrowRightOutlined />
            </div>
          </>
        );

      case 'testimonial': {
        const computedInitials =
          initials ||
          (author
            ? author
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
            : 'FK');

        return (
          <>
            <div className={s.testimonial__stars}>
              {[...Array(rating)].map((_, i) => (
                <StarFilled key={i} style={{ color: '#FFC107', fontSize: 14 }} />
              ))}
            </div>
            {description && <p className={s.testimonial__review}>"{description}"</p>}
            {children}
            <div className={s.testimonial__authorRow}>
              <div
                className={s.testimonial__avatar}
                style={{
                  backgroundColor: `${tagColor || '#2196F3'}20`,
                  color: tagColor || '#2196F3',
                }}
              >
                {computedInitials}
              </div>
              <div className={s.testimonial__authorInfo}>
                {author && <div className={s.testimonial__name}>{author}</div>}
                {subAuthor && <div className={s.testimonial__subAuthor}>{subAuthor}</div>}
              </div>
              {tag && <FrolicTag color={tagColor} size="sm">{tag}</FrolicTag>}
            </div>
          </>
        );
      }

      case 'stat':
        return (
          <>
            {icon && (
              <span className={s.stat__icon} style={{ color: color || '#F7941D' }}>
                {icon}
              </span>
            )}
            <div className={s.stat__value} style={{ color: color || '#1A2016' }}>
              {value}
              {suffix}
            </div>
            {label && <div className={s.stat__label}>{label}</div>}
            {children}
          </>
        );

      case 'contact': {
        const valueElement = href ? (
          <a href={href} className={s.contact__value}>
            {value}
          </a>
        ) : (
          <div className={s.contact__value}>{value}</div>
        );

        return (
          <>
            {icon && (
              <div
                className={s.contact__icon}
                style={{
                  backgroundColor: iconBg || `${color || '#4CAF50'}18`,
                  color: color || '#4CAF50',
                }}
              >
                {icon}
              </div>
            )}
            <div className={s.contact__content}>
              {label && <div className={s.contact__label}>{label}</div>}
              {valueElement}
              {children}
            </div>
          </>
        );
      }

      case 'activity':
        return (
          <>
            {icon && (
              <div
                className={s.activity__icon}
                style={{
                  backgroundColor: iconBg || `${color || '#FF5722'}18`,
                  color: color || '#FF5722',
                }}
              >
                {icon}
              </div>
            )}
            {label && <div className={s.activity__label}>{label}</div>}
            {description && <div className={s.activity__desc}>{description}</div>}
            {children}
          </>
        );

      case 'default':
      default:
        return (
          <>
            {title && <h3 className={s.feature__title}>{title}</h3>}
            {subtitle && <div className={s.hint}>{subtitle}</div>}
            {description && <p className={s.feature__desc}>{description}</p>}
            {children}
          </>
        );
    }
  };

  const wrapperProps = {
    className: cardClasses,
    style: customStyle,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick,
    ...rest,
  };

  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <div {...wrapperProps}>{renderContent()}</div>
      </Link>
    );
  }

  return <div {...wrapperProps}>{renderContent()}</div>;
}
