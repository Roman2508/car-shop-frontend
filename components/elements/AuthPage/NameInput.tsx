import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/inputs/index.module.scss'

const NameInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <span>Ім'я</span>

    <input
      {...register('username', {
        minLength: 2,
        maxLength: 20,
        required: "Введіть своє ім'я!",
      })}
      className={styles.form__input}
      type="text"
      placeholder="Ім'я"
      style={{ width: '300px' }}
    />
    {errors.username && <span className={styles.error_alert}>{errors.username?.message}</span>}
    {errors.username && errors.username.type === 'minLength' && (
      <span className={styles.error_alert}>Мінімум 2 символа!</span>
    )}
    {errors.username && errors.username.type === 'maxLength' && (
      <span className={styles.error_alert}>Не більше 15 символів!</span>
    )}
  </label>
)

export default NameInput
