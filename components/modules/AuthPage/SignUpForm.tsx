import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { IInputs } from '@/types/auth'
import { singUpFx } from '@/app/api/auth'
import { showAuthError } from '@/utils/errors'
import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import inputsStyles from '@/styles/create-ad/index.module.scss'
import NameInput from '@/components/elements/AuthPage/NameInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { authRegister } from '@/redux/auth/authAsyncActions'
import { useAppDispatch } from '@/redux/store'
import { useSelector } from 'react-redux'
import { themeSelector } from '@/redux/theme/themeSlice'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const dispatch = useAppDispatch()

  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const { mode } = useSelector(themeSelector)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      const { payload } = await dispatch(authRegister({ ...data, role: 'USER' }))

      if (!payload) return

      resetField('email')
      resetField('username')
      resetField('password')
      switchForm()
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>Зареєструватись</h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />

      <button
        className={`${inputsStyles.button} ${darkModeClass}`}
        style={{ marginTop: '32px', height: '40px', width: '300px' }}
      >
        {spinner ? (
          <div className={spinnerStyles.spinner}>
            <div />
          </div>
        ) : (
          'Зареєструватись'
        )}
      </button>
    </form>
  )
}

export default SignUpForm
