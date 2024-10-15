import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { IInputs } from '@/types/auth'
import { showAuthError } from '@/utils/errors'
import { singInFx } from '../../../app/api/auth'
import styles from '@/styles/auth/index.module.scss'
import inputStyles from '@/styles/create-ad/index.module.scss'
import NameInput from '@/components/elements/AuthPage/NameInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { useAppDispatch } from '@/redux/store'
import { authLogin } from '@/redux/auth/authAsyncActions'

const SignInForm = () => {
  const dispatch = useAppDispatch()

  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)

      const { payload } = await dispatch(authLogin(data))

      if (payload) {
        resetField('email')
        resetField('password')
        route.push('/dashboard')
      }
      // console.log(a)

      // await singInFx({
      //   url: '/users/login',
      //   username: data.name,
      //   password: data.password,
      // })
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
        {/* <button className={`${inputStyles.button} ${styles.button} ${styles.submit} ${darkModeClass}`}> */}
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
