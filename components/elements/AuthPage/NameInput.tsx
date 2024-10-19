import { IAuthPageInput } from '@/types/auth'
// import styles from '@/styles/auth/index.module.scss'
import styles from '@/styles/inputs/index.module.scss'

const NameInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <span>Ім'я</span>

    <input
      {...register('name', {
        minLength: 2,
        maxLength: 20,
        required: "Введіть своє ім'я!",
      })}
      className={styles.form__input}
      type="text"
      placeholder="Ім'я"
      style={{ width: '300px' }}
    />
    {errors.name && <span className={styles.error_alert}>{errors.name?.message}</span>}
    {errors.name && errors.name.type === 'minLength' && <span className={styles.error_alert}>Мінімум 2 символа!</span>}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>Не більше 15 символів!</span>
    )}
  </label>
)

export default NameInput
