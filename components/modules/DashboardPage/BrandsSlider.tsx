/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import { useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import { useStore } from 'effector-react'
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
    {
      id: 1,
      img: 'https://cdn.freelogovectors.net/wp-content/uploads/2023/04/bmw_motorrad_logo-freelogovectors.net_.png',
      alt: 'brand-1',
    },
    {
      id: 2,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Audi_logo_detail.svg/2560px-Audi_logo_detail.svg.png',
      alt: 'brand-2',
    },
    {
      id: 3,
      img: 'https://blog.logomaster.ai/hs-fs/hubfs/Mercedes-Benz%20logo-1933.jpg?width=672&height=454&name=Mercedes-Benz%20logo-1933.jpg',
      alt: 'brand-3',
    },
    { id: 4, img: 'https://logos-world.net/wp-content/uploads/2021/06/Porsche-Logo.png', alt: 'brand-4' },
    {
      id: 5,
      img: 'https://car-logos.net/wp-content/uploads/2023/03/lamborghini-logo-1998-present-scaled.webp',
      alt: 'brand-5',
    },
    {
      id: 6,
      img: 'https://www.svgrepo.com/show/331599/tesla.svg',
      alt: 'brand-3',
    },
    { id: 7, img: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Volkswagen_-_Logo.svg', alt: 'brand-2' },
    {
      id: 8,
      img: 'https://upload.wikimedia.org/wikipedia/uk/thumb/3/3a/Porsche_AG_Logo.svg/2560px-Porsche_AG_Logo.svg.png',
      alt: 'brand-1',
    },
    { id: 9, img: 'https://cdn.worldvectorlogo.com/logos/toyota-7.svg', alt: 'brand-3' },
    {
      id: 10,
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/1200px-Mitsubishi_logo.svg.png',
      alt: 'brand-4',
    },
    { id: 11, img: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg', alt: 'brand-2' },
    { id: 12, img: 'https://cdn.worldvectorlogo.com/logos/skoda-6.svg', alt: 'brand-1' },
  ]

  useEffect(() => {
    const slider = document.querySelector(`.${styles.dashboard__brands__slider}`)

    const list = slider?.querySelector('.slick-list') as HTMLElement

    list.style.height = isMedia768 ? '60px' : '180px'
    // list.style.height = isMedia768 ? '60px' : '80px'
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
