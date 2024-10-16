import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { $user } from '@/context/user'
import { formatPrice } from '@/utils/common'
import { $boilerPart } from '@/context/boilerPart'
import styles from '@/styles/part/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $shoppingCart } from '@/context/shopping-cart'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import PartTabs from '@/components/modules/PartPage/PartTabs'
import catalogStyles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import PartAccordion from '@/components/modules/PartPage/PartAccordion'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import SendMessageSvg from '@/components/elements/SendMessageSvg/SendMessageSvg'
import { $boilerParts, setBoilerParts, setBoilerPartsByPopularity } from '@/context/boilerParts'
import FuelSvg from '@/components/elements/FuelSvg/FuelSvg'
import EngineSvg from '@/components/elements/EngineSvg/EngineSvg'
import GearBoxSvg from '@/components/elements/GearBoxSvg/GearBoxSvg'
import SpeedometerSvg from '@/components/elements/SpeedometerSvg/SpeedometerSvg'
import { boilers } from '../DashboardPage/DashboardPage'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import EditSvg from '@/components/elements/EditSvg/EditSvg'
import GarbageSvg from '@/components/elements/GarbageSvg/GarbageSvg'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import Edit2Svg from '@/components/elements/EditSvg/Edit2Svg'
import ConfirmSvg from '@/components/elements/ConfirmSvg/ConfirmSvg'
import { advertisementsSelector } from '@/redux/advertisements/advertisementsSlice'
import { useSelector } from 'react-redux'
// import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
// import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'

const PartPage = () => {
  const { fullAdvertisement } = useSelector(advertisementsSelector)

  const mode = useStore($mode)
  const user = useStore($user)
  const isMobile = useMediaQuery(850)
  const boilerPart = useStore($boilerPart)
  const boilerParts = useStore($boilerParts)
  const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = cartItems.some((item) => item.partId === boilerPart.id)
  const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getBoilerPartsFx.pending)

  // useEffect(() => {
  //   loadBoilerPart()
  // }, [])

  // const loadBoilerPart = async () => {
  //   try {
  //     // const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

  //     const data = boilers

  //     setBoilerParts(data)
  //     setBoilerPartsByPopularity()
  //   } catch (error) {
  //     toast.error((error as Error).message)
  //   }
  // }

  const toggleToCart = () => toggleCartItem(user.username, boilerPart.id, isInCart)

  if (!fullAdvertisement) return <div></div>

  

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__wrapper} ${darkModeClass}`}>
          <div className={`${styles.part__top}`}>
            <h2 className={`${styles.part__title} ${darkModeClass}`}>{fullAdvertisement.title}</h2>
            <div>
              <span className={`${styles.part__actions} ${darkModeClass}`}>
                <span title="Опублікувати оголошення">
                  <ConfirmSvg darkModeClass={darkModeClass} />
                </span>

                <span title="Редагувати оголошення">
                  <Edit2Svg darkModeClass={darkModeClass} />
                </span>

                <span title="Видалити оголошення">
                  <GarbageSvg darkModeClass={darkModeClass} />
                </span>
              </span>
            </div>
          </div>

          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(fullAdvertisement.price || 0)} грн.
              </span>

              <span className={styles.part__info__stock}>
                {fullAdvertisement.status === 'АКТИВНЕ' ? (
                  <span className={styles.part__info__stock__success}>АКТИВНЕ</span>
                ) : (
                  <span className={styles.part__info__stock__not}>ОЧІКУЄ ПІДТВЕРДЖЕННЯ</span>
                )}
              </span>

              {/* <span className={styles.part__info__code}>Артикул: {boilerPart.vendor_code}</span> */}

              <div style={{ marginBottom: '24px' }}>
                <span className={catalogStyles.catalog__list__item__code}>
                  {/* Київ, Шевченківський - 10 жовтня 2024 р. */}
                  1111111111111
                  {fullAdvertisement.createdAt}
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <SpeedometerSvg />
                  {fullAdvertisement.mileage}
                  {/* 2020 115 тис.км. */}
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <EngineSvg />
                  {fullAdvertisement.engineVolume}
                  {/* 2.50 л. */}
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <GearBoxSvg />
                  {fullAdvertisement.gearbox}
                  {/* Автоматична */}
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <FuelSvg />
                  {fullAdvertisement.fuelType}
                  {/* Бензин */}
                </span>
              </div>

              <button
                onClick={toggleToCart}
                style={{ backgroundColor: '#5acccc' }}
                className={`${styles.part__info__btn} ${isInCart ? styles.in_cart : ''}`}
              >
                {spinnerToggleCart ? (
                  <span className={spinnerStyles.spinner} style={{ top: 10, left: '45%' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в карзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                      )} */}

                    <span style={{ color: '#fff', marginRight: '8px' }}>Зв'язатись з продавцем</span>
                    <SendMessageSvg />
                  </div>
                )}
              </button>
              {!isMobile && <PartTabs fullAdvertisement={fullAdvertisement} />}
            </div>
          </div>
        </div>

        {isMobile && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <PartAccordion title="Опис">
                <div className={`${styles.part__accordion__content} ${darkModeClass}`}>
                  <h3 className={`${styles.part__tabs__content__title} ${darkModeClass}`}>{fullAdvertisement.title}</h3>
                  <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>
                    {fullAdvertisement.description}
                  </p>
                </div>
              </PartAccordion>
            </div>

            <PartAccordion title="Деталі">
              <div className={`${styles.part__accordion__content} ${darkModeClass}`}>
                <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>1121221</p>
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={styles.part__bottom}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>Схожі оголошення</h2>
          <DashboardSlider goToPartPage spinner={spinnerSlider} items={boilerParts.rows || []} />
        </div>
      </div>
    </section>
  )
}

export default PartPage
