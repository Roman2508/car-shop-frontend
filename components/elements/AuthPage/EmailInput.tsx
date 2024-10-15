import { IAuthPageInput } from '@/types/auth'
// import styles from '@/styles/auth/index.module.scss'
import styles from '@/styles/inputs/index.module.scss'

const EmailInput = ({ register, errors }: IAuthPageInput) => (
  <div style={{ marginTop: '16px' }}>
    <label className={styles.form__label}>
      <span>Пошта</span>
      <input
        {...register('email', {
          required: 'Введите Email!',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Не коректний формат пошти!',
          },
        })}
        className={styles.form__input}
        type="email"
        placeholder="Email"
        style={{ width: '300px' }}
      />
      {errors.email && <span className={styles.error_alert}>{errors.email?.message}</span>}
    </label>
  </div>
)

export default EmailInput
