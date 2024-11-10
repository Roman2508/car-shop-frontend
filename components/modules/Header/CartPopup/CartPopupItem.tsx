/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useSelector } from 'react-redux'

import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import { IShoppingCartItem } from '../../../../types/shopping-cart'
import { formatPrice } from '@/utils/common'
import { usePrice } from '@/hooks/usePrice'
import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass = mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } = usePrice(item.count, item.partId, item.price)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.name} />
        </div>
        <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
          <a className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}>
            <span>
              {item.name.replace('.', '')}, {item.parts_manufacturer}, {item.boiler_manufacturer}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        <span className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}>{formatPrice(price)} P</span>
      </div>
    </li>
  )
}

export default CartPopupItem
