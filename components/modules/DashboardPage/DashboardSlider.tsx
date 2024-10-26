/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import { useStore } from 'effector-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { useEffect } from 'react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IDashboardSlider } from '@/types/dashboard'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { formatPrice } from '@/utils/common'
import styles from '@/styles/dashboard/index.module.scss'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import emptyImage from '../../../assets/empty-upscaled.jpeg'
import Image from 'next/image'
import SpeedometerSvg from '@/components/elements/SpeedometerSvg/SpeedometerSvg'
import EngineSvg from '@/components/elements/EngineSvg/EngineSvg'
import GearBoxSvg from '@/components/elements/GearBoxSvg/GearBoxSvg'
import FuelSvg from '@/components/elements/FuelSvg/FuelSvg'
import { formatDate } from '@/utils/formatDate'
import Empty from '@/components/elements/EmptySvg/EmptySvg'
import { createImageUrl } from '@/utils/createImageUrl'

interface IDashboardSliderProps {
  items: AdvertisementType[]
  spinner: boolean
  goToPartPage?: boolean
}

const DashboardSlider: React.FC<IDashboardSliderProps> = ({ items, spinner, goToPartPage }) => {
  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

    slider.forEach((item) => {
      const list = item.querySelector('.slick-list') as HTMLElement

      list.style.height = isMedia560 ? '276px' : '410px'
      list.style.padding = '0 5px'
      list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
    })
  }, [isMedia560, isMedia800])

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
    <Slider {...settings} className={styles.dashboard__slider}>
      {spinner ? (
        [...Array(8)].map((_, i) => (
          <div
            className={`${skeletonStyles.skeleton__item} ${mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`}
            key={i}
            style={width}
          >
            <div className={skeletonStyles.skeleton__item__light} />
          </div>
        ))
      ) : items && items.length ? (
        items.map((item) => (
          <div className={`${styles.dashboard__slide} ${darkModeClass}`} key={item.id} style={width}>
            <Link href={goToPartPage ? `/catalog/${item.id}` : '/catalog'}>
              {item.photos.length ? (
                <img src={createImageUrl(item.photos[0]?.filename)} alt={'car photo'} />
              ) : (
                <Image src={emptyImage} width={500} height={500} alt="Picture of the author" />
              )}
            </Link>
            <div className={styles.dashboard__slide__inner}>
              <Link href={goToPartPage ? `/catalog/${item.id}` : '/catalog'} passHref legacyBehavior>
                <a href="">
                  <h3 className={styles.dashboard__slide__title}>{item.title}</h3>
                </a>
              </Link>

              <p style={{ fontSize: '14px', marginBottom: '12px' }}>{formatDate(item.createdAt)}</p>

              <div className={styles.dashboard__slide__description__wrapper}>
                <span className={styles.dashboard__slide__description}>
                  <SpeedometerSvg />
                  {item.mileage}
                </span>

                <span className={styles.dashboard__slide__description}>
                  <EngineSvg />
                  {item.engineVolume}
                </span>

                <span className={styles.dashboard__slide__description}>
                  <GearBoxSvg />
                  {item.gearbox}
                </span>

                <span className={styles.dashboard__slide__description}>
                  <FuelSvg />
                  {item.fuelType}
                </span>
              </div>

              <span className={styles.dashboard__slide__price}>{formatPrice(item.price)} P</span>
            </div>
          </div>
        ))
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Empty darkModeClass={darkModeClass} />
        </div>
      )}
    </Slider>
  )
}

export default DashboardSlider
