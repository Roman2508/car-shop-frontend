/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/footer/index.module.scss'
import Link from 'next/link'
import FooterLogo from './FooterLogo'
import OnlineStoreContent from './OnlineStoreContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import Accordion from '@/components/elements/Accordion/Accordion'

const Footer = () => {
  const isMedia750 = useMediaQuery(750)
  const isMedia500 = useMediaQuery(500)

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          <div className={styles.footer__bottom__block__right}>
            <h3 className={styles.footer__top__item__title} style={{ width: 'auto' }}>
              Ми в соц. мережах:
            </h3>
            <ul className={styles.footer__bottom__block__social}>
              <li className={styles.footer__bottom__block__social__item}>
                <a href="#" className={styles.footer__bottom__block__social__item_fb} />
              </li>
              <li className={styles.footer__bottom__block__social__item}>
                <a href="#" className={styles.footer__bottom__block__social__item_inst} />
              </li>
              <li className={styles.footer__bottom__block__social__item}>
                <a href="#" className={styles.footer__bottom__block__social__item_ytb} />
              </li>
            </ul>
          </div>

          <div className={styles.footer__top__inner}>
            <div className={styles.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={styles.footer__top__item__title}>Інтернет-магазин</h3>
                  <OnlineStoreContent />
                </>
              )}
              {isMedia500 && (
                <Accordion
                  title="Интернет-магазин"
                  titleClass={styles.footer__top__item__title}
                  arrowOpenClass={styles.open}
                >
                  <OnlineStoreContent />
                  <div style={{ height: 17 }} />
                </Accordion>
              )}
            </div>
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>Контакти</h3>
            <ul className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}>
              <li className={styles.footer__top__item__list__item}>
                <Link href="/" passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наша адреса:</span>
                    <span>м. Київ, вул. Дніпровська, буд. 74</span>
                    <span>
                      <MarkerSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a href="tel:+780955555555" className={styles.footer__top__item__list__item__link}>
                  <span>Наш контактний телефон:</span>
                  <span>(+380)65-35-55-555</span>
                  <span>
                    <PhoneSvg />
                  </span>
                </a>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a href="mailto:info@car.shop.com" className={styles.footer__top__item__list__item__link}>
                  <span>E-mail:</span>
                  <span>info@car.shop.com</span>
                  <span>
                    <MailSvg />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>© «Car Shop» 2024.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
