/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { $user } from '@/context/user'
import { formatPrice } from '@/utils/common'
import { IBoilerPart } from '@/types/boilerparts'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $shoppingCart } from '@/context/shopping-cart'
import styles from '@/styles/catalog/index.module.scss'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import SpeedometerSvg from '@/components/elements/SpeedometerSvg/SpeedometerSvg'
import EngineSvg from '@/components/elements/EngineSvg/EngineSvg'
import GearBoxSvg from '@/components/elements/GearBoxSvg/GearBoxSvg'
import FuelSvg from '@/components/elements/FuelSvg/FuelSvg'
import SendMessageSvg from '@/components/elements/SendMessageSvg/SendMessageSvg'

const CatalogItem = ({ item }: { item: IBoilerPart }) => {
  const mode = useStore($mode)
  const user = useStore($user)
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  const spinner = useStore(removeFromCartFx.pending)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
        <img src={JSON.parse(item.images)[0]} alt={item.name} style={{ cursor: 'pointer' }} />
      </Link>

      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <h3 className={styles.catalog__list__item__title}>
            {item.name} {item.name} {item.name}
          </h3>
        </Link>

        <span className={styles.catalog__list__item__code}>Київ, Шевченківський</span>
        <span className={styles.catalog__list__item__code}>10 жовтня 2024 р.</span>

        <span className={styles.catalog__list__item__details}>
          <SpeedometerSvg />
          2020 115 тис.км.
        </span>

        <span className={styles.catalog__list__item__details}>
          <EngineSvg />
          2.50 л.
        </span>

        <span className={styles.catalog__list__item__details}>
          <GearBoxSvg />
          Автоматична
        </span>

        <span className={styles.catalog__list__item__details}>
          <FuelSvg />
          Бензин
        </span>

        {/* <span className={styles.catalog__list__item__code}>Артикул: {item.vendor_code}</span> */}
        <span className={styles.catalog__list__item__price}>{formatPrice(item.price)} грн.</span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`}
        disabled={spinner}
        onClick={toggleToCart}
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
    </li>
  )
}

export default CatalogItem
