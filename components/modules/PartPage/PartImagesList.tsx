/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'
import { $boilerPart } from '@/context/boilerPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartImagesItem from './PartImagesItem'
import PartSlider from './PartSlider'
import styles from '@/styles/part/index.module.scss'
import emptyImage from '../../../assets/empty-upscaled.jpeg'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import Image from 'next/image'

const PartImagesList = ({ fullAdvertisement }: { fullAdvertisement: AdvertisementType }) => {
  const boilerPart = useStore($boilerPart)
  const isMobile = useMediaQuery(850)
  const images = fullAdvertisement.photos.length ? fullAdvertisement.photos.map((el) => el.filename) : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            {currentImgSrc ? (
              <img src={currentImgSrc} alt={boilerPart.name} />
            ) : fullAdvertisement.photos[0] ? (
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${fullAdvertisement.photos[0].filename}`}
                alt={boilerPart.name}
              />
            ) : (
              <Image src={emptyImage} width={500} height={500} alt="Picture of the author" />
            )}

            <img
              src={
                currentImgSrc || fullAdvertisement.photos[0]
                  ? `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${fullAdvertisement.photos[0].filename}`
                  : require('../../../assets/empty.jpg')
              }
              alt={boilerPart.name}
            />
          </div>

          <ul className={styles.part__images__list}>
            {images.map((item, i) => {
              const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${item}`

              return <PartImagesItem key={i} alt={`image-${i + 1}`} callback={setCurrentImgSrc} src={imageUrl} />
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList
