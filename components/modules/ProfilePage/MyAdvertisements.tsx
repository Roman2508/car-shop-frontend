import React, { useEffect } from 'react'
import styles from '@/styles/ProfileForm/index.module.scss'
import catalogStyles from '@/styles/catalog/index.module.scss'
import advStyles from '@/styles/dashboard/index.module.scss'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useAppDispatch } from '@/redux/store'
import { getAdvertisementById, getMyAdvertisements } from '@/redux/advertisements/advertisementsAsyncActions'
import { useSelector } from 'react-redux'
import { authSelector } from '@/redux/auth/authSlice'
import { advertisementsSelector, clearAdvertisements } from '@/redux/advertisements/advertisementsSlice'
import CatalogItem from '../CatalogPage/CatalogItem'
import Empty from '@/components/elements/EmptySvg/EmptySvg'

const MyAdvertisements = () => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { advertisements } = useSelector(advertisementsSelector)

  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  React.useEffect(() => {
    if (!auth) return
    dispatch(getMyAdvertisements(auth.id))

    return () => {
      dispatch(clearAdvertisements())
    }
  }, [])

  //   useEffect(() => {
  //     const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

  //     slider.forEach((item) => {
  //       const list = item.querySelector('.slick-list') as HTMLElement

  //       list.style.height = isMedia560 ? '276px' : '390px'
  //       list.style.padding = '0 5px'
  //       list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
  //     })
  //   }, [isMedia560, isMedia800])

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: isMedia768 ? 1 : 2,
  }

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  }

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
