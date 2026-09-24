import React from 'react';
import { Form } from 'antd';

/**
 * Universal Frolic Form Wrapper
 *
 * @param {import('antd').FormInstance} [form]
 * @param {Function} [onFinish]
 * @param {Function} [onFinishFailed]
 * @param {'vertical' | 'horizontal' | 'inline'} [layout='vertical']
 * @param {any} [initialValues]
 * @param {string} [className]
 * @param {React.CSSProperties} [style]
 * @param {React.ReactNode} children
 */
export default function FrolicForm({
  form,
  onFinish,
  onFinishFailed,
  layout = 'vertical',
  initialValues,
  className = '',
  style = {},
  children,
  ...rest
}) {
  return (
    <Form
      form={form}
      layout={layout}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={className}
      style={{ width: '100%', ...style }}
      {...rest}
    >
      {children}
    </Form>
  );
}

FrolicForm.Item = Form.Item;
FrolicForm.useForm = Form.useForm;
