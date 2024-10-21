/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import { useStore } from 'effector-react'
import { useSelector } from 'react-redux'

import { $mode } from '@/context/mode'
import { $user } from '@/context/user'
import { formatPrice } from '@/utils/common'
import emptyImage from '../../../assets/empty.jpg'
import { authSelector } from '@/redux/auth/authSlice'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $shoppingCart } from '@/context/shopping-cart'
import styles from '@/styles/catalog/index.module.scss'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import FuelSvg from '@/components/elements/FuelSvg/FuelSvg'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import EngineSvg from '@/components/elements/EngineSvg/EngineSvg'
import GearBoxSvg from '@/components/elements/GearBoxSvg/GearBoxSvg'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import SendMessageSvg from '@/components/elements/SendMessageSvg/SendMessageSvg'
import SpeedometerSvg from '@/components/elements/SpeedometerSvg/SpeedometerSvg'

const CatalogItem = ({ item, self = false }: { item: AdvertisementType; self?: boolean }) => {
  const mode = useStore($mode)

  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  const spinner = useStore(removeFromCartFx.pending)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  // const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

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

        <span className={styles.catalog__list__item__code}>!!!!!!!Київ, Шевченківський</span>
        {/* <span className={styles.catalog__list__item__code}>10 жовтня 2024 р.</span> */}
        <span className={styles.catalog__list__item__code}>{item.createdAt}</span>

        <span className={styles.catalog__list__item__details}>
          <SpeedometerSvg />
          {item.mileage}
          {/* 2020 115 тис.км. */}
        </span>

        <span className={styles.catalog__list__item__details}>
          <EngineSvg />
          {item.engineVolume}
          {/* 2.50 л. */}
        </span>

        <span className={styles.catalog__list__item__details}>
          <GearBoxSvg />
          {/* Автоматична */}
          {item.gearbox}
        </span>

        <span className={styles.catalog__list__item__details}>
          <FuelSvg />
          {/* Бензин */}
          {item.fuelType}
        </span>

        {/* <span className={styles.catalog__list__item__code}>Артикул: {item.vendor_code}</span> */}
        <span className={styles.catalog__list__item__price}>{formatPrice(item.price)} грн.</span>
      </div>

      {!self && (
        <button
          disabled={spinner}
          onClick={() => alert(1)}
          className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`}
        >
          {spinner ? (
            <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
          ) : (
            <>
              <span title="Зв'язатись з продавцем">
                <SendMessageSvg />
              </span>
              {/* <span>{isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}</span> */}
            </>
          )}
        </button>
      )}
    </li>
  )
}

export default CatalogItem
