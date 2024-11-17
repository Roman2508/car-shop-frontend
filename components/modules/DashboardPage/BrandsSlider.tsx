/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/dashboard/index.module.scss'
import BrandsSliderNextArrow from '@/components/elements/BrandsSliderNextArrow/BrandsSliderNextArrow'
import BrandsSliderPrevArrow from '@/components/elements/BrandsSliderPrevArrow/BrandsSliderPrevArrow'
import { themeSelector } from '@/redux/theme/themeSlice'
import { useSelector } from 'react-redux'

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768)
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const brandItems = [
    { id: 1, img: 'img/brands/bmw.png', alt: 'brand-1' },
    { id: 2, img: 'img/brands/audi.png', alt: 'brand-2' },
    { id: 3, img: 'img/brands/mers.webp', alt: 'brand-3' },
    { id: 5, img: 'img/brands/lambo.webp', alt: 'brand-5' },
    { id: 6, img: 'img/brands/tesla.svg', alt: 'brand-6' },
    { id: 7, img: 'img/brands/vw.svg', alt: 'brand-7' },
    { id: 8, img: 'img/brands/porsche.png', alt: 'brand-8' },
    { id: 9, img: 'img/brands/toyota.svg', alt: 'brand-9' },
    { id: 10, img: 'img/brands/mitsubishi.png', alt: 'brand-10' },
    { id: 11, img: 'img/brands/kia.svg', alt: 'brand-11' },
    { id: 12, img: 'img/brands/skoda.svg', alt: 'brand-12' },
  ]

  useEffect(() => {
    const slider = document.querySelector(`.${styles.dashboard__brands__slider}`)

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia768 ? '60px' : '180px'
  }, [isMedia768])

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  }

  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandItems.map((item) => (
        <div
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          key={item.id}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          <img src={item.img} alt={item.alt} />
        </div>
      ))}
    </Slider>
  )
}

export default BrandsSlider
