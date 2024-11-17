import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'


import { IInputs } from '@/types/auth'
import { showAuthError } from '@/utils/errors'
import { useAppDispatch } from '@/redux/store'
import styles from '@/styles/auth/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import { authLogin } from '@/redux/auth/authAsyncActions'
import inputStyles from '@/styles/create-ad/index.module.scss'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'

const SignInForm = () => {
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
  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)

      const { payload } = await dispatch(authLogin(data))

      if (payload) {
        resetField('email')
        resetField('password')
        route.push('/')
      }
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>Увійти</h2>
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        disabled={spinner}
        className={`${inputStyles.button} ${darkModeClass}`}
        style={{ marginTop: '32px', width: '300px', padding: '11px 50px', height: '40px', position: 'relative' }}
      >
        {spinner ? (
          <div className={inputStyles.spinner}>
            <div />
          </div>
        ) : (
          'Увійти'
        )}
      </button>
    </form>
  )
}

export default SignInForm
