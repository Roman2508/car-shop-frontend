import { IProfileInput } from '@/types/profileForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const EmailInput = ({ register, errors, darkModeClass }: IProfileInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Email *</span>
    <input
      className={styles.feedback_form__form__input}
      type="email"
      placeholder="test@gmail.com"
      {...register('email', {
        required: 'Введите Email!',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Неправильний формат пошти!',
        },
      })}
    />
    {errors.email && <span className={styles.error_alert}>{errors.email?.message}</span>}
  </label>
)

export default EmailInput
