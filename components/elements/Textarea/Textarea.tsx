import React from 'react'
import styles from '@/styles/inputs/index.module.scss'

interface ITextareaProps {
  errors: any
  register: any
  darkModeClass: string
  inputName: string

  label?: string
  required?: string
  minLength?: number
  maxLength?: number
  placeholder?: string
}

const Textarea: React.FC<ITextareaProps> = (props) => {
  const { register, inputName, errors, darkModeClass, required, maxLength, minLength, label, placeholder = '' } = props

  let validateOptions: Record<string, any> = {
    required: required ? required : false,
  }

  if (minLength) validateOptions.minLength = minLength
  if (maxLength) validateOptions.maxLength = maxLength

  return (
    <label className={`${styles.form__label} ${errors[inputName] && styles.form_error} ${darkModeClass}`}>
      {label && (
        <span style={errors[inputName] ? { color: 'red' } : {}}>
          {label} {required && ' *'}
        </span>
      )}

      <textarea
        placeholder={placeholder}
        {...register(inputName, validateOptions)}
        className={`${styles.form__textarea} ${darkModeClass}`}
      />
      {errors[inputName] && <span className={styles.error_alert}>{errors[inputName]?.message}</span>}
      {errors[inputName] && errors[inputName].type === 'minLength' && (
        <span className={styles.error_alert}>Мінімум {minLength} символів!</span>
      )}
      {errors[inputName] && errors[inputName].type === 'maxLength' && (
        <span className={styles.error_alert}>Максимум {maxLength} символів!</span>
      )}
    </label>
  )
}

export default Textarea
