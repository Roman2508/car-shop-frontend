import React from 'react'

import styles from '@/styles/inputs/index.module.scss'

interface ITextInputProps {
  errors: any
  register: any
  inputName: string
  darkModeClass: string

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
    cssStyles = {},
    required = '',
    minLength = 0,
    maxLength = 0,
    type = 'text',
    placeholder = '',
  } = props

  let validateOptions: Record<string, any> = {
    required: required ? required : false,
  }

  if (maxLength) validateOptions.maxLength = maxLength
  if (minLength) validateOptions.minLength = minLength
  if (pattern) validateOptions.pattern = pattern

  return (
    <label className={`${styles.form__label} ${darkModeClass}`} style={cssStyles}>
      {label && (
        <span>
          {label} {required && ' *'}
        </span>
      )}

      <input
        {...register(inputName, validateOptions)}
        className={styles.form__input}
        placeholder={placeholder}
        type={type}
      />

      {errors.name && <span className={styles.error_alert}>{errors.name?.message}</span>}
      {errors.name && errors.name.type === 'minLength' && (
        <span className={styles.error_alert}>Мін. кількість символів: {minLength}!</span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className={styles.error_alert}>Макс. кількість символів: {maxLength}!</span>
      )}
    </label>
  )
}

export default TextInput
