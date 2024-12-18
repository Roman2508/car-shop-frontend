import React from 'react'
import styles from '@/styles/profileForm/index.module.scss'
import catalogStyles from '@/styles/catalog/index.module.scss'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/redux/store'
import CatalogItem from '../CatalogPage/CatalogItem'
import { authSelector } from '@/redux/auth/authSlice'
import { themeSelector } from '@/redux/theme/themeSlice'
import Empty from '@/components/elements/EmptySvg/EmptySvg'
import { getMyAdvertisements } from '@/redux/advertisements/advertisementsAsyncActions'
import { advertisementsSelector, clearAdvertisements } from '@/redux/advertisements/advertisementsSlice'

const MyAdvertisements = () => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { advertisements } = useSelector(advertisementsSelector)

  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  React.useEffect(() => {
    if (!auth) return
    dispatch(getMyAdvertisements(auth.id))

    return () => {
      dispatch(clearAdvertisements())
    }
  }, [])

  return (
    <>
      {advertisements && advertisements.length ? (
        <div className={styles.advertisements}>
          <div className={catalogStyles.catalog__list}>
            {advertisements.map((item) => (
              <CatalogItem item={item} key={item.id} self />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Empty darkModeClass={darkModeClass} text="У вас поки немає оголошень" />
        </div>
      )}
    </>
  )
}

export default MyAdvertisements
