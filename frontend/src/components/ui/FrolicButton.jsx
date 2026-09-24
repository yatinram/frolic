import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';
import s from './FrolicButton.module.scss';

/**
 * Universal Frolic Button Component
 *
 * @param {'primary' | 'secondary' | 'ghost' | 'green' | 'blue' | 'danger' | 'link'} [variant='primary']
 * @param {'sm' | 'md' | 'lg'} [size='md']
 * @param {React.ReactNode} [icon]
 * @param {'left' | 'right'} [iconPosition='right']
 * @param {boolean} [loading=false]
 * @param {boolean} [disabled=false]
 * @param {boolean} [block=false]
 * @param {string} [to] - If provided, renders as React Router Link
 * @param {string} [href] - If provided, renders as <a> tag
 * @param {Function} [onClick]
 * @param {'button' | 'submit' | 'reset'} [htmlType='button']
 * @param {string} [className]
 * @param {React.CSSProperties} [style]
 * @param {React.ReactNode} children
 */
export default function FrolicButton({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  block = false,
  to,
  href,
  onClick,
  htmlType = 'button',
  className = '',
  style = {},
  children,
  ...rest
}) {
  const btnClasses = classNames(
    s.button,
    s[`button--${variant}`],
    s[`button--${size}`],
    {
      [s['button--block']]: block,
      [s['button--loading']]: loading,
      [s['button--disabled']]: disabled,
    },
    className
  );

  const iconElement = loading ? <LoadingOutlined spin /> : icon;

  const content = (
    <>
      {iconElement && iconPosition === 'left' && <span className={s.iconLeft}>{iconElement}</span>}
      {children && <span>{children}</span>}
      {iconElement && iconPosition === 'right' && <span className={s.iconRight}>{iconElement}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={btnClasses} style={style} {...rest}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={btnClasses} style={style} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={htmlType}
      className={btnClasses}
      style={style}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  );
}
