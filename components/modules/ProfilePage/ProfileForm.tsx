import { toast } from 'sonner'
import { useStore } from 'effector-react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/store'
import React, { MutableRefObject, useRef, useState } from 'react'
import { FieldErrorsImpl, useForm, UseFormRegister } from 'react-hook-form'

import PasswordInput from './PasswordInput'
import { authSelector } from '@/redux/auth/authSlice'
import { createImageUrl } from '@/utils/createImageUrl'
import styles from '@/styles/ProfileForm/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import createAdStyles from '@/styles/create-ad/index.module.scss'
import TextInput from '@/components/elements/TextInput/TextInput'
import { updateUser, uploadAvatar } from '@/redux/auth/authAsyncActions'
import { deleteFile, uploadFile } from '@/redux/advertisements/advertisementsAsyncActions'
import { themeSelector } from '@/redux/theme/themeSlice'

export interface IProfileInputs {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export type IProfileInput = {
  register: UseFormRegister<IProfileInputs>
  errors: Partial<FieldErrorsImpl<IProfileInputs>>
  darkModeClass?: string
}

const ProfileForm = () => {
  const { auth } = useSelector(authSelector)

  const dispatch = useAppDispatch()

  const photoRef = React.useRef<HTMLInputElement | null>(null)

  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const {
    setError,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileInputs>()

  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const onSubmit = async (data: IProfileInputs) => {
    if (!auth) return

    try {
      setSpinner(true)
      if ((data.password || data.confirmPassword) && data.password !== data.confirmPassword) {
        setError('password', { message: 'Паролі не збігаються', type: 'pattern' })
        setError('confirmPassword', { message: 'Паролі не збігаються', type: 'pattern' })
        return
      }

      await dispatch(updateUser({ ...data, id: auth.id }))
    } catch (err) {
      toast.error('Не вдалось оновити профіль')
    } finally {
      setSpinner(false)
    }
  }

  const handleChangeImage = async (event: Event) => {
    if (!auth) return

    const target = event.target as HTMLInputElement
    const file = target.files && target.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      const { payload } = await dispatch(uploadAvatar(formData))

      if (!payload) {
        toast.error('Помилка завантаження')
        return
      }

      if (!auth.avatarUrl) return

      await dispatch(deleteFile({ filename: auth.avatarUrl }))

      if (!payload) {
        toast.error('Помилка видалення фото')
      }

      target.value = ''
    }
  }

  React.useEffect(() => {
    if (!auth) return

    setValue('username', auth.username)
    setValue('email', auth.email)
  }, [auth])

  React.useEffect(() => {
    if (!photoRef.current) return
    photoRef.current.addEventListener('change', handleChangeImage)

    return () => {
      photoRef.current?.removeEventListener('change', handleChangeImage)
    }
  }, [])

  return (
    <div className={`${styles.form} ${darkModeClass}`}>
      <h3 className={`${styles.form__title} ${darkModeClass}`}>Редагування профілю</h3>

      <div style={{ width: '150px', height: '150px', margin: '0 auto 20px' }}>
        {auth?.avatarUrl ? (
          <label className={createAdStyles.create__ad__photo__wrapper}>
            <input type="file" style={{ display: 'none' }} ref={photoRef} />
            <img src={createImageUrl(auth.avatarUrl)} />
            <span>Змінити фото</span>
          </label>
        ) : (
          <label className={`${createAdStyles.create__ad__photo} ${darkModeClass}`}>
            <input type="file" style={{ display: 'none' }} ref={photoRef} />
            Додати фото
          </label>
        )}
      </div>

      <form ref={formRef} className={styles.form__form} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
          inputName="username"
          label="Ім'я"
        />

        <div style={{ margin: '20px 0' }}>
          <TextInput
            register={register}
            errors={errors}
            darkModeClass={darkModeClass}
            label="Email"
            inputName="email"
            pattern={{ value: /\S+@\S+\.\S+/, message: 'Неправильний формат пошти!' }}
          />
        </div>

        <PasswordInput register={register} errors={errors} darkModeClass={darkModeClass} inputName="password" />

        <PasswordInput register={register} errors={errors} darkModeClass={darkModeClass} inputName="confirmPassword" />

        <div className={styles.form__form__btn}>
          <button className={`${darkModeClass}`} disabled={spinner}>
            {spinner ? <span className={spinnerStyles.spinner} style={{ top: '6px', left: '47%' }} /> : 'Зберегти'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileForm
