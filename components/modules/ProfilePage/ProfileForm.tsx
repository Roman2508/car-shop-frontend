import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { MutableRefObject, useRef, useState } from 'react'

import NameInput from './NameInput'
import EmailInput from './EmailInput'
import { $mode } from '@/context/mode'
import emailjs from '@emailjs/browser'
import PasswordInput from './PasswordInput'
import { ProfileInputs } from '@/types/profileForm'
import styles from '@/styles/ProfileForm/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const ProfileForm = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>()
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const submitForm = () => {
    setSpinner(true)
    emailjs
      .sendForm('service_4406d2p', 'template_88thtrg', formRef.current, 'ARtfb1bp4SELm6yXa')
      .then((result) => {
        setSpinner(false)
        toast.success(`Сообщение отправлено! ${result.text}`)
      })
      .catch((error) => {
        setSpinner(false)
        toast.error(`Что-то пошло не так! ${error.text}`)
      })

    formRef.current.reset()
  }

  return (
    <div className={`${styles.form} ${darkModeClass}`}>
      <h3 className={`${styles.form__title} ${darkModeClass}`}>Редагування профілю</h3>

      <form ref={formRef} className={styles.form__form} onSubmit={handleSubmit(submitForm)}>
        <NameInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <EmailInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <PasswordInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <PasswordInput register={register} errors={errors} darkModeClass={darkModeClass} label="Повторіть пароль" />

        <div className={styles.form__form__btn}>
          <button className={`${darkModeClass}`}>
            {spinner ? <span className={spinnerStyles.spinner} style={{ top: '6px', left: '47%' }} /> : 'Зберегти'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm
