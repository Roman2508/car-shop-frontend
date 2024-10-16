import React from 'react'

import styles from '@/styles/inputs/index.module.scss'

interface ITextInputProps {
  errors: any
  register: any
  inputName: string
  darkModeClass: string

  min?: number
  label?: string
  cssStyles?: any
  required?: string
  minLength?: number
  maxLength?: number
  placeholder?: string
  type?: 'text' | 'number' | 'email'
  pattern?: { value: RegExp; message: string }
}

const TextInput: React.FC<ITextInputProps> = (props) => {
  const {
    label,
    errors,
    pattern,
    register,
    inputName,
    darkModeClass,
    min = 0,
    cssStyles = {},
    required = '',
    minLength,
    maxLength,
    type = 'text',
    placeholder = '',
  } = props

  let validateOptions: Record<string, any> = {
    required: required ? required : false,
  }

  if (type === 'number') validateOptions.min = min
  if (minLength) validateOptions.minLength = minLength
  if (maxLength) validateOptions.maxLength = maxLength
  if (pattern) validateOptions.pattern = pattern

  return (
    <label
      style={cssStyles}
      className={`${styles.form__label} ${darkModeClass} ${errors[inputName] && styles.form_error}`}
    >
      {label && (
        <span style={errors[inputName] ? { color: 'red' } : {}}>
          {label} {required && ' *'}
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={styles.form__input}
        {...register(inputName, validateOptions)}
      />

      {errors[inputName] && <span className={styles.error_alert}>{errors[inputName]?.message}</span>}
      {errors[inputName] && errors[inputName].type === 'minLength' && (
        <span className={styles.error_alert}>Мін. кількість символів: {minLength}!</span>
      )}
      {errors[inputName] && errors[inputName].type === 'maxLength' && (
        <span className={styles.error_alert}>Макс. кількість символів: {maxLength}!</span>
      )}
      {errors[inputName] && errors[inputName].type === 'min' && (
        <span className={styles.error_alert}>Рік повинен бути більшим ніж: {min}!</span>
      )}
    </label>
  )
}

export default TextInput
