import Link from 'next/link'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { useSelector } from 'react-redux'

import { $mode } from '@/context/mode'
import { usePopup } from '@/hooks/usePoup'
import ProfileDropdown from './ProfileDropdown'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/header/index.module.scss'
import { authSelector } from '@/redux/auth/authSlice'
import CityButton from '@/components/elements/CityButton/CityButton'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'

const nav = [
  // { link: '/shipping-payment', label: 'Доставка та оплата' },
  // { link: '/about', label: 'Про компанію' },
  { link: '/dashboard', label: 'Головна' },
  { link: '/catalog', label: 'Каталог' },
  // { link: '/contacts', label: 'Контакти' },
  // { link: '/wholesale-buyers', label: 'Оптовим покупцям' },
  { link: '/profile?tab=messages', label: 'Повідомлення' },
  { link: '/profile?tab=profile', label: 'Профіль' },
  { link: '/create-ad', label: 'Створити оголошення' },
  { link: '/', label: 'Авторизація' },
]

const HeaderTop = () => {
  const router = useRouter()

  const { auth } = useSelector(authSelector)

  const isMedia950 = useMediaQuery(950)
  const { toggleOpen, open, closePopup } = usePopup()
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 && <CityButton />}
        {isMedia950 && (
          <button onClick={toggleOpen} className={`${styles.burger_menu} ${open ? styles.open : ''} ${darkModeClass}`}>
            <span />
            <span />
            <span />
          </button>
        )}

        <nav className={`${styles.header__nav} ${open ? styles.open : ''}  ${darkModeClass}`}>
          <ul className={styles.header__nav__list}>
            {nav.map((el) => {
              const isActive =
                el.label === 'Профіль' && router.asPath.includes('/profile') && !router.asPath.includes('messages')
                  ? true
                  : router.asPath === el.link

              const availableTabs = ['/profile?tab=messages', '/profile?tab=profile', '/create-ad']

              if (!auth && availableTabs.some((a) => a === el.link)) {
                return
              }

              if (auth && auth.id && el.link === '/') {
                return
              }

              return (
                <li className={styles.header__nav__list__item}>
                  <Link href={el.link} passHref legacyBehavior>
                    <a
                      onClick={closePopup}
                      className={`${styles.header__nav__list__item__link} 
                      ${isActive ? styles.active : ''} ${darkModeClass}`}
                    >
                      {el.label}
                    </a>
                  </Link>
                </li>
              )
            })}

            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <CityButton />
              </li>
            )}
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <ModeToggler />
              </li>
            )}
          </ul>
        </nav>

        <ProfileDropdown />
      </div>
    </div>
  )
}

export default HeaderTop
