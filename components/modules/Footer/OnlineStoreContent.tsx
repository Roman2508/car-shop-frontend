import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const OnlineStoreContent = () => (
  <ul className={styles.footer__top__item__list}>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/catalog" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Каталог</a>
      </Link>
    </li>
    {/* <li className={styles.footer__top__item__list__item}>
      <Link href="/shipping-payment" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Доставка и оплата (del)</a>
      </Link>
    </li> */}
    {/*  */}
    <li className={styles.footer__top__item__list__item}>
      <Link href="/about" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Про компанію</a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/contacts" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Зворотній зв'язок</a>
      </Link>
    </li>
    {/* <li className={styles.footer__top__item__list__item}>
      <Link href="/wholesale-buyers" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Оптовым покупателям (del)</a>
      </Link>
    </li> */}
    <li className={styles.footer__top__item__list__item}>
      <Link href="/contacts" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Контакти</a>
      </Link>
    </li>
  </ul>
)

export default OnlineStoreContent
