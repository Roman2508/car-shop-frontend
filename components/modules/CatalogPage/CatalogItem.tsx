/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'

import { formatPrice } from '@/utils/common'
import emptyImage from '../../../assets/empty.jpg'

import { formatDate } from '@/utils/formatDate'
import styles from '@/styles/catalog/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import FuelSvg from '@/components/elements/FuelSvg/FuelSvg'
import EngineSvg from '@/components/elements/EngineSvg/EngineSvg'
import GearBoxSvg from '@/components/elements/GearBoxSvg/GearBoxSvg'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import SendMessageSvg from '@/components/elements/SendMessageSvg/SendMessageSvg'
import SpeedometerSvg from '@/components/elements/SpeedometerSvg/SpeedometerSvg'

const CatalogItem = ({ item, self = false }: { item: AdvertisementType; self?: boolean }) => {
  const { mode } = useSelector(themeSelector)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const imageUrl = item.photos[0] ? `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${item.photos[0].filename}` : ''

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
        {imageUrl ? (
          <img src={imageUrl} alt={item.title} style={{ cursor: 'pointer' }} />
        ) : (
          <Image src={emptyImage} alt="11" width={200} height={200} />
        )}
      </Link>

      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>
            {item.title} {item.title} {item.title}
          </h3>
        </Link>

        <span className={styles.catalog__list__item__code}>{formatDate(item.createdAt)}</span>

        <span className={styles.catalog__list__item__details}>
          <SpeedometerSvg />
          {item.mileage}
        </span>

        <span className={styles.catalog__list__item__details}>
          <EngineSvg />
          {item.engineVolume}
        </span>

        <span className={styles.catalog__list__item__details}>
          <GearBoxSvg />
          {item.gearbox}
        </span>

        <span className={styles.catalog__list__item__details}>
          <FuelSvg />
          {item.fuelType}
        </span>

        <span className={styles.catalog__list__item__price}>{formatPrice(item.price)} грн.</span>
      </div>

      {!self && (
        <button onClick={() => alert(1)} className={`${styles.catalog__list__item__cart}`}>
          <span title="Зв'язатись з продавцем">
            <SendMessageSvg />
          </span>
        </button>
      )}
    </li>
  )
}

export default CatalogItem
