import React from 'react';
import classNames from 'classnames';
import FrolicTag from './FrolicTag';
import s from './SectionHeader.module.scss';

/**
 * Universal Frolic Section Heading Component
 *
 * @param {string | React.ReactNode} [tag]
 * @param {string} [tagColor='orange']
 * @param {React.ReactNode} [tagIcon]
 * @param {string | React.ReactNode} title
 * @param {string | React.ReactNode} [subtitle]
 * @param {boolean} [center=false]
 * @param {string} [className]
 * @param {React.CSSProperties} [style]
 */
export default function SectionHeader({
  tag,
  tagColor = 'orange',
  tagIcon,
  title,
  subtitle,
  center = false,
  className = '',
  style = {},
}) {
  return (
    <div
      className={classNames(
        s.header,
        {
          [s['header--center']]: center,
          [s['header--left']]: !center,
        },
        className
      )}
      style={style}
    >
      {tag && (
        <div className={s.tagWrapper}>
          <FrolicTag color={tagColor} icon={tagIcon}>
            {tag}
          </FrolicTag>
        </div>
      )}
      {title && <h2 className={s.title}>{title}</h2>}
      {subtitle && <p className={s.subtitle}>{subtitle}</p>}
    </div>
  );
}
