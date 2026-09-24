import React from 'react';
import {
  Input,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  TimePicker,
  InputNumber,
  Upload,
  Button as AntButton,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import s from './FrolicInput.module.scss';

const { TextArea } = Input;

/**
 * Universal Frolic Form Control Component
 *
 * @param {'text' | 'email' | 'tel' | 'password' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'checkboxGroup' | 'date' | 'time' | 'file'} [type='text']
 * @param {string} [label]
 * @param {string} [name]
 * @param {string} [placeholder]
 * @param {any} [value]
 * @param {Function} [onChange]
 * @param {Array<{label: string, value: any, disabled?: boolean}>} [options]
 * @param {boolean} [required=false]
 * @param {boolean} [disabled=false]
 * @param {string} [error]
 * @param {string} [hint]
 * @param {number} [rows=4] - for textarea
 * @param {number} [min] - for number
 * @param {number} [max] - for number
 * @param {string} [accept] - for file upload
 * @param {'small' | 'middle' | 'large'} [size='large']
 * @param {React.ReactNode} [prefix]
 * @param {React.ReactNode} [suffix]
 * @param {string} [className]
 * @param {React.CSSProperties} [style]
 */
export default function FrolicInput({
  type = 'text',
  label,
  name,
  placeholder,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error,
  hint,
  rows = 4,
  min,
  max,
  accept,
  size = 'large',
  prefix,
  suffix,
  className = '',
  style = {},
  ...rest
}) {
  const handleChange = (e) => {
    if (!onChange) return;
    if (e && e.target !== undefined) {
      if (type === 'checkbox') {
        onChange(e.target.checked);
      } else {
        onChange(e.target.value);
      }
    } else {
      onChange(e);
    }
  };

  const renderControl = () => {
    switch (type) {
      case 'password':
        return (
          <Input.Password
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            prefix={prefix}
            suffix={suffix}
            className={s.inputControl}
            {...rest}
          />
        );

      case 'number':
        return (
          <InputNumber
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            min={min}
            max={max}
            prefix={prefix}
            className={s.inputControl}
            {...rest}
          />
        );

      case 'textarea':
        return (
          <TextArea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            rows={rows}
            size={size}
            className={s.inputControl}
            {...rest}
          />
        );

      case 'select':
        return (
          <Select
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            options={options}
            className={s.inputControl}
            {...rest}
          />
        );

      case 'radio':
        return (
          <Radio.Group
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={s.radioGroup}
            {...rest}
          >
            {options.map((opt) => (
              <Radio key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        );

      case 'checkbox':
        return (
          <Checkbox
            id={name}
            name={name}
            checked={!!value}
            onChange={handleChange}
            disabled={disabled}
            className={s.checkboxControl}
            {...rest}
          >
            {placeholder || label}
          </Checkbox>
        );

      case 'checkboxGroup':
        return (
          <Checkbox.Group
            id={name}
            name={name}
            options={options}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={s.radioGroup}
            {...rest}
          />
        );

      case 'date':
        return (
          <DatePicker
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            className={s.inputControl}
            style={{ width: '100%' }}
            {...rest}
          />
        );

      case 'time':
        return (
          <TimePicker
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            className={s.inputControl}
            style={{ width: '100%' }}
            {...rest}
          />
        );

      case 'file':
        return (
          <Upload
            name={name}
            accept={accept}
            beforeUpload={() => false}
            onChange={handleChange}
            disabled={disabled}
            {...rest}
          >
            <AntButton icon={<UploadOutlined />} size={size} className={s.inputControl}>
              {placeholder || 'Click to Upload'}
            </AntButton>
          </Upload>
        );

      case 'text':
      case 'email':
      case 'tel':
      default:
        return (
          <Input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            size={size}
            prefix={prefix}
            suffix={suffix}
            className={s.inputControl}
            {...rest}
          />
        );
    }
  };

  // If type is single checkbox, label is rendered inside the checkbox control
  const showOuterLabel = label && type !== 'checkbox';

  return (
    <div
      className={classNames(s.fieldWrapper, { [s['fieldWrapper--error']]: !!error }, className)}
      style={style}
    >
      {showOuterLabel && (
        <label htmlFor={name} className={s.label}>
          {label}
          {required && <span className={s.requiredStar}>*</span>}
        </label>
      )}

      {renderControl()}

      {hint && !error && <div className={s.hint}>{hint}</div>}
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
}
