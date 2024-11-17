/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from '@/utils/common'
import { formatDate } from '@/utils/formatDate'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { createImageUrl } from '@/utils/createImageUrl'
import { themeSelector } from '@/redux/theme/themeSlice'
import styles from '@/styles/dashboard/index.module.scss'
import Empty from '@/components/elements/EmptySvg/EmptySvg'
import FuelSvg from '@/components/elements/FuelSvg/FuelSvg'
import emptyImage from '../../../assets/empty-upscaled.jpeg'
import EngineSvg from '@/components/elements/EngineSvg/EngineSvg'
import GearBoxSvg from '@/components/elements/GearBoxSvg/GearBoxSvg'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import SpeedometerSvg from '@/components/elements/SpeedometerSvg/SpeedometerSvg'

interface IDashboardSliderProps {
  items: AdvertisementType[]
  goToPartPage?: boolean
}

const DashboardSlider: React.FC<IDashboardSliderProps> = ({ items, goToPartPage }) => {
  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const { mode } = useSelector(themeSelector)
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
      {items && items.length ? (
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

              <p
                style={
                  darkModeClass === 'light'
                    ? { fontSize: '14px', marginBottom: '12px' }
                    : { fontSize: '14px', marginBottom: '12px', color: '#c9c9c9' }
                }
              >
                {formatDate(item.createdAt)}
              </p>

              <div className={`${styles.dashboard__slide__description__wrapper} ${darkModeClass}`}>
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

              <span className={styles.dashboard__slide__price}>{formatPrice(item.price)} грн.</span>
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
