/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/header/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import SearchInput from '@/components/elements/Header/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'

const HeaderBottom = () => {
  const isMedia950 = useMediaQuery(950)
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <img src="/img/favicon/android-chrome-192x192.png" alt="logo" />

              <span className={`${styles.header__logo__link__text} ${darkModeClass}`}>Car Shop</span>
            </a>
          </Link>
        </h1>

        <SearchInput />

        <div className={styles.header__shopping_cart}>{!isMedia950 && <ModeToggler />}</div>
      </div>
    </div>
  )
}

export default HeaderBottom
