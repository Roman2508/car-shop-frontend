import { IProfileInput } from '@/types/profileForm'
import styles from '@/styles/feedbackForm/index.module.scss'

type ProfileInputType = IProfileInput & { label?: string }

const PasswordInput = ({ register, errors, darkModeClass, label = 'Пароль' }: ProfileInputType) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>{label} *</span>
    <input
      className={styles.feedback_form__form__input}
      type="password"
      placeholder=""
      {...register('password', {
        // required: 'Введіть пароль',
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ]*$/,
          message: 'Недопустимое значение',
        },
        minLength: 6,
        maxLength: 20,
      })}
    />
    {errors.name && <span className={styles.error_alert}>{errors.name?.message}</span>}
    {errors.name && errors.name.type === 'minLength' && <span className={styles.error_alert}>Минимум 6 символів!</span>}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Максимум 20 символов!</span>
    )}
  </label>
)

export default PasswordInput
