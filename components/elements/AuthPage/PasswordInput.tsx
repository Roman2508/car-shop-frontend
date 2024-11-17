import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/inputs/index.module.scss'

const PasswordInput = ({ register, errors }: IAuthPageInput) => (
  <div style={{ marginTop: '16px' }}>
    <label className={styles.form__label}>
      <span>Пароль</span>
      <input
        {...register('password', {
          required: 'Введите пароль!',
          minLength: 8,
          maxLength: 20,
        })}
        className={styles.form__input}
        type="password"
        placeholder="Password"
        style={{ width: '300px' }}
      />
      {errors.password && <span className={styles.error_alert}>{errors.password?.message}</span>}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>Мінімум 8 символів!</span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 20 символов!</span>
      )}
    </label>
  </div>
)

export default PasswordInput
