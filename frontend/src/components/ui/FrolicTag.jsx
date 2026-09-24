import React from 'react';
import classNames from 'classnames';
import s from './FrolicTag.module.scss';

/**
 * Universal Frolic Pill Tag Component
 *
 * @param {'orange' | 'green' | 'blue' | 'yellow' | 'coral' | 'purple' | 'pink' | string} [color='orange']
 * @param {string} [bg]
 * @param {'sm' | 'md' | 'lg'} [size='md']
 * @param {React.ReactNode} [icon]
 * @param {string} [className]
 * @param {React.CSSProperties} [style]
 * @param {React.ReactNode} children
 */
export default function FrolicTag({
  color = 'orange',
  bg,
  size = 'md',
  icon,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const isNamedColor = ['orange', 'green', 'blue', 'yellow', 'coral', 'purple', 'pink'].includes(color);

  const tagClasses = classNames(
    s.tag,
    s[`tag--${size}`],
    {
      [s[`tag--${color}`]]: isNamedColor && !bg,
    },
    className
  );

  const customStyle = {
    ...style,
    ...(!isNamedColor || bg
      ? {
          color: isNamedColor ? undefined : color,
          backgroundColor: bg || `${color}18`,
        }
      : {}),
  };

  return (
    <span className={tagClasses} style={customStyle} {...rest}>
      {icon && <span className={s.icon}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
