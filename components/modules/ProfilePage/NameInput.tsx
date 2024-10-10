import { IProfileInput } from '@/types/profileForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const NameInput = ({ register, errors, darkModeClass }: IProfileInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Имя *</span>
    <input
      className={styles.feedback_form__form__input}
      type="text"
      placeholder="Ім'я"
      {...register('name', {
        required: "Введіть Ім'я!",
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ]*$/,
          message: 'Недопустиме значення',
        },
        minLength: 2,
        maxLength: 20,
      })}
    />
    {errors.name && <span className={styles.error_alert}>{errors.name?.message}</span>}
    {errors.name && errors.name.type === 'minLength' && <span className={styles.error_alert}>Минимум 2 символа!</span>}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 20 символов!</span>
    )}
  </label>
)

export default NameInput
