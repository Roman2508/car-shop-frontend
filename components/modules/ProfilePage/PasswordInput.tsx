import { IProfileInput } from './ProfileForm'
import styles from '@/styles/feedbackForm/index.module.scss'

type ProfileInputType = IProfileInput & {
  label?: string
  required?: boolean
  inputName?: 'password' | 'confirmPassword'
}

const PasswordInput = ({
  register,
  errors,
  darkModeClass,
  label = 'Пароль',
  required = false,
  inputName = 'password',
}: ProfileInputType) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>
      {label} {required && '*'}
    </span>
    <input
      className={styles.feedback_form__form__input}
      type={'password'}
      placeholder=""
      {...register(inputName, {
        minLength: 8,
        maxLength: 20,
        required,
      })}
    />
    {/* @ts-ignore */}
    {errors[inputName] && <span className={styles.error_alert}>{errors[inputName]?.message}</span>}
    {/* @ts-ignore */}
    {errors[inputName] && errors[inputName].type === 'minLength' && (
      <span className={styles.error_alert}>Мінімум 8 символів!</span>
    )}
    {/* @ts-ignore */}
    {errors[inputName] && errors[inputName].type === 'maxLength' && (
      <span className={styles.error_alert}>Максимум 20 символов!</span>
    )}
  </label>
)

export default PasswordInput
