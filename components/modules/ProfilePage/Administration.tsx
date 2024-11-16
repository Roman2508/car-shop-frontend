import React from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/ProfileForm/index.module.scss'
import catalogStyles from '@/styles/catalog/index.module.scss'
import { usePopup } from '@/hooks/usePoup'
import { useAppDispatch } from '@/redux/store'
import { getNotAccepted } from '@/redux/advertisements/advertisementsAsyncActions'
import { advertisementsSelector, clearAdvertisements } from '@/redux/advertisements/advertisementsSlice'
import { useSelector } from 'react-redux'
import CatalogItem from '../CatalogPage/CatalogItem'
import { useRouter } from 'next/router'
import { authSelector } from '@/redux/auth/authSlice'
import { themeSelector } from '@/redux/theme/themeSlice'

const Administration = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const { auth } = useSelector(authSelector)
  const { advertisements } = useSelector(advertisementsSelector)

  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const width = { width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344 }

  React.useEffect(() => {
    const isAdmin = auth?.role === 'ADMIN' || auth?.role === 'SUPER_ADMIN'
    if (!isAdmin) {
      router.replace('/profile')
      return
    }

    dispatch(getNotAccepted())

    return () => {
      dispatch(clearAdvertisements())
    }
  }, [])

  return (
    <div className={styles.administration}>
      {advertisements && advertisements.length ? (
        <div className={catalogStyles.catalog__list}>
          {advertisements.map((item) => (
            <CatalogItem item={item} key={item.id} self />
          ))}
        </div>
      ) : (
        <h2
          style={
            darkModeClass
              ? { color: '#fff', fontWeight: 500, width: '100%', textAlign: 'center', padding: '80px 0' }
              : { color: '#000', fontWeight: 500, width: '100%', textAlign: 'center', padding: '80px 0' }
          }
        >
          Немає нових оголошень
        </h2>
      )}
    </div>
  )
}

export default Administration
