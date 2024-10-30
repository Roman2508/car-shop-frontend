import React from 'react'
import Link from 'next/link'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/ProfileForm/index.module.scss'
import advStyles from '@/styles/dashboard/index.module.scss'
import catalogStyles from '@/styles/catalog/index.module.scss'
import { usePopup } from '@/hooks/usePoup'
import FilterSelect from '../CatalogPage/FilterSelect'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'
import { useAppDispatch } from '@/redux/store'
import { getNotAccepted } from '@/redux/advertisements/advertisementsAsyncActions'
import { advertisementsSelector, clearAdvertisements } from '@/redux/advertisements/advertisementsSlice'
import { useSelector } from 'react-redux'
import CatalogItem from '../CatalogPage/CatalogItem'
import { useRouter } from 'next/router'
import { authSelector } from '@/redux/auth/authSlice'

const Administration = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const { auth } = useSelector(authSelector)
  const { advertisements } = useSelector(advertisementsSelector)

  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const width = { width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344 }

  const { toggleOpen, open, closePopup } = usePopup()

  const [spinner, setSpinner] = React.useState(false)

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
      {/* <div className={`${styles.administration__filter} ${darkModeClass}`}>
        <div className={catalogStyles.catalog__top__inner}>
          <div></div>

          <button className={catalogStyles.catalog__top__mobile_btn} onClick={toggleOpen}>
            <span className={catalogStyles.catalog__top__mobile_btn__svg}>
              <FilterSvg />
            </span>
            <span className={styles.catalog__top__mobile_btn__text}>Фильтр</span>
          </button>
          <FilterSelect setSpinner={setSpinner} />
        </div>
      </div> */}

      {advertisements ? (
        <div className={catalogStyles.catalog__list}>
          {advertisements.map((item) => (
            <CatalogItem item={item} key={item.id} self />
          ))}
        </div>
      ) : (
        <h2
          style={
            darkModeClass
              ? { color: '#fff', fontWeight: 500, width: '100%', textAlign: 'center', padding: '40px 0' }
              : { color: '#000', fontWeight: 500, width: '100%', textAlign: 'center', padding: '40px 0' }
          }
        >
          Немає нових оголошень
        </h2>
      )}
    </div>
  )
}

export default Administration
