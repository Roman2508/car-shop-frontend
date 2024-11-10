import React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/redux/store'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { authSelector } from '@/redux/auth/authSlice'
import styles from '@/styles/profile/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import buttonStyles from '@/styles/create-ad/index.module.scss'
import SelectInput from '@/components/elements/SelectInput/SelectInput'
import { getAllUsers, updateRole } from '@/redux/auth/authAsyncActions'

interface IUsersFields {
  userId: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
}

const userRoles = {
  USER: 'Користувач',
  ADMIN: 'Адміністратор',
  SUPER_ADMIN: 'Супер адміністратор',
}

const UsersTab = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const {
    register,
    setError,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<IUsersFields>({ mode: 'onChange' })

  const { auth, users } = useSelector(authSelector)

  const [usersList, setUsersList] = React.useState<{ value: string; label: string }[]>([])

  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)

  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const width = { width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344 }

  const [spinner, setSpinner] = React.useState(false)

  const onSubmit = async (data: IUsersFields) => {
    try {
      setSpinner(true)
      if (!data.userId) {
        setError('userId', { message: 'Виберіть користувача', type: 'pattern' })
        return
      }
      if (!data.role) {
        setError('role', { message: 'Виберіть роль', type: 'pattern' })
        return
      }
      if (!window.confirm('Ви впевнені, що хочете змінити користувачу роль?')) return
      await dispatch(updateRole({ role: data.role, id: Number(data.userId) }))
      window.location.reload()
    } catch (err) {
      toast.error('Не вдалось оновити роль')
    } finally {
      setSpinner(false)
    }
  }

  React.useEffect(() => {
    if (!users) return
    const usersList = users.map((el) => ({
      value: String(el.id),
      label: `${el.username} (${userRoles[el.role]})`,
    }))
    setUsersList(usersList)
  }, [users])

  React.useEffect(() => {
    const isSuperAdmin = auth?.role === 'SUPER_ADMIN'
    if (!isSuperAdmin) {
      router.replace('/profile')
      return
    }

    dispatch(getAllUsers())
  }, [])

  return (
    <div className={styles.users}>
      <div className={`${styles.users__wrapper} ${darkModeClass}`}>
        <h4 className={`${styles.users__title} ${darkModeClass}`}>Змінити роль користувачу</h4>

        <div className={styles.users__actions}>
          <form className={styles.users__actions__inner} onSubmit={handleSubmit(onSubmit)}>
            <SelectInput
              required
              errors={errors}
              label="Користувач"
              options={usersList}
              {...register('userId')}
              styles={{ marginTop: '32px' }}
              onChange={(e: any) => setValue('userId', e.value)}
            />

            <SelectInput
              required
              label="Роль"
              errors={errors}
              {...register('role')}
              styles={{ marginTop: '32px' }}
              options={[
                { label: 'Користувач', value: 'USER' },
                { label: 'Адміністратор', value: 'ADMIN' },
                { label: 'Супер адміністратор', value: 'SUPER_ADMIN' },
              ]}
              onChange={(e: any) => setValue('role', e.value)}
            />

            <div>
              <button
                type="submit"
                disabled={spinner}
                className={buttonStyles.button}
                style={{ width: '340px', marginTop: '32px' }}
              >
                {spinner ? 'Завантаження...' : 'Зберегти'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UsersTab
