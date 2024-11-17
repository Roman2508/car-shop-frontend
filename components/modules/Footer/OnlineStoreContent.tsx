import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const OnlineStoreContent = () => (
  <ul className={styles.footer__top__item__list}>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Каталог</a>
      </Link>
    </li>

    <li className={styles.footer__top__item__list__item}>
      <Link href="/" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Про компанію</a>
      </Link>
    </li>
    <li className={styles.footer__top__item__list__item}>
      <Link href="/" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Зворотній зв'язок</a>
      </Link>
    </li>

    <li className={styles.footer__top__item__list__item}>
      <Link href="/" passHref legacyBehavior>
        <a className={styles.footer__top__item__list__item__link}>Контакти</a>
      </Link>
    </li>
  </ul>
)

export default OnlineStoreContent
