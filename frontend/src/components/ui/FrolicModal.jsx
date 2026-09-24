import React from 'react';
import { Modal } from 'antd';

/**
 * Universal Frolic Modal Wrapper
 *
 * @param {boolean} open
 * @param {Function} onCancel
 * @param {string | React.ReactNode} [title]
 * @param {React.ReactNode} [footer]
 * @param {number | string} [width=480]
 * @param {boolean} [centered=true]
 * @param {React.ReactNode} children
 */
export default function FrolicModal({
  open,
  onCancel,
  title,
  footer = null,
  width = 480,
  centered = true,
  children,
  ...rest
}) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={title}
      footer={footer}
      width={width}
      centered={centered}
      styles={{
        content: {
          borderRadius: 24,
          padding: 32,
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.2)',
        },
        header: {
          marginBottom: 20,
        },
      }}
      {...rest}
    >
      {children}
    </Modal>
  );
}
