import { useStore } from 'effector-react'
import { forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg'
import { $mode } from '@/context/mode'
import { IWrappedComponentProps } from '../../../types/common'
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg'
import { withClickOutside } from '../../../utils/withClickOutside'
import styles from '@/styles/profileDropDown/index.module.scss'
import { $user } from '@/context/user'
import { logoutFx } from '@/app/api/auth'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { authSelector } from '@/redux/auth/authSlice'

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(({ open, setOpen }, ref) => {
  const mode = useStore($mode)
  const router = useRouter()
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const { auth } = useSelector(authSelector)

  const toggleProfileDropDown = () => setOpen(!open)

  const handleLogout = async () => {
    await logoutFx('/users/logout')
    router.push('/')
  }

  if (!auth) return <div></div>

  return (
    <div className={styles.profile} ref={ref}>
      <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
        <span className={styles.profile__span}>
          <ProfileSvg />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={`${styles.profile__dropdown} ${darkModeClass}`}
            style={{ transformOrigin: 'right top' }}
          >
            <li className={styles.profile__dropdown__user}>
              <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{auth.username}</span>
              <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{auth.email}</span>
            </li>
            <li className={styles.profile__dropdown__item}>
              <button className={styles.profile__dropdown__item__btn} onClick={handleLogout}>
                <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>Вийти</span>
                <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                  <LogoutSvg />
                </span>
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
})

ProfileDropDown.displayName = 'ProfileDropDown'

export default withClickOutside(ProfileDropDown)
