import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { MutableRefObject, useRef, useState } from 'react'

import NameInput from './NameInput'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import emailjs from '@emailjs/browser'
import MessageInput from './MessageInput'
import { FeedbackInputs } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useSelector } from 'react-redux'
import { themeSelector } from '@/redux/theme/themeSlice'

const FeedbackForm = () => {
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()
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
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>Форма обратной связи</h3>
      <form ref={formRef} className={styles.feedback_form__form} onSubmit={handleSubmit(submitForm)}>
        <NameInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <PhoneInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <EmailInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <MessageInput register={register} errors={errors} darkModeClass={darkModeClass} />
        <div className={styles.feedback_form__form__btn}>
          <button>
            {spinner ? (
              <span className={spinnerStyles.spinner} style={{ top: '6px', left: '47%' }} />
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
