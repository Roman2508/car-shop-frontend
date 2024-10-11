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

  if (maxLength) validateOptions.maxLength = maxLength
  if (minLength) validateOptions.minLength = minLength

  return (
    <label className={`${styles.form__label} ${darkModeClass}`}>
      {label && (
        <span>
          {label} {required && ' *'}
        </span>
      )}

      <textarea
        placeholder={placeholder}
        {...register(inputName, validateOptions)}
        className={`${styles.form__textarea} ${darkModeClass}`}
      />
      {errors.message && <span className={styles.error_alert}>{errors.message?.message}</span>}
      {errors.message && errors.message.type === 'minLength' && (
        <span className={styles.error_alert}>Минимум 20 символов!</span>
      )}
      {errors.message && errors.message.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 300 символов!</span>
      )}
    </label>
  )
}

export default Textarea
