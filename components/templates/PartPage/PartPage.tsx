import React, { useEffect } from 'react'
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
import { advertisementsSelector, clearFullAdvertisements } from '@/redux/advertisements/advertisementsSlice'
import { useSelector } from 'react-redux'
import { formatDate } from '@/utils/formatDate'
import { useAppDispatch } from '@/redux/store'
import { acceptAdvertisement, deleteAdvertisement } from '@/redux/advertisements/advertisementsAsyncActions'
import { useRouter } from 'next/router'
import { authSelector } from '@/redux/auth/authSlice'
import { AuthType } from '@/redux/auth/authTypes'
import { createDialog } from '@/redux/dialogs/dialogsAsyncActions'
import { DialogType } from '@/redux/dialogs/dialogsTypes'
// import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
// import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'

const PartPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { fullAdvertisement } = useSelector(advertisementsSelector)

  const [isDisableContactButton, setIsDisableContactButton] = React.useState(false)
  const [isDisabledControllButtons, setIsDisabledControllButtons] = React.useState(false)

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

  useEffect(() => {
    return () => {
      dispatch(clearFullAdvertisements())
    }
  }, [])

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

  const canDeleteAdvertisement = (auth: AuthType | null, advertisementAuthorId: number) => {
    if (!auth) return

    if (auth.id === advertisementAuthorId) {
      return true
    }

    if (auth.role === 'SUPER_ADMIN' || auth.role === 'ADMIN') {
      return true
    }

    return false
  }

  const onDeleteAdvertisement = async (id: number) => {
    if (!window.confirm('Ви дійсно хочете видалити оголошення?')) return

    const { payload } = await dispatch(deleteAdvertisement(id))

    if (payload) {
      router.push(`/catalog`)
    }
  }

  const changeAdStatus = async (id: number) => {
    if (!window.confirm('Змінити статус оголошення?')) return

    try {
      setIsDisabledControllButtons(true)
      dispatch(acceptAdvertisement(id))
    } finally {
      setIsDisabledControllButtons(false)
    }
  }

  const contactToSeller = async () => {
    try {
      setIsDisableContactButton(true)
      if (!auth || !fullAdvertisement) return
      const data = { members: [auth.id, fullAdvertisement.user.id], advertisement: fullAdvertisement.id }

      const { payload } = await dispatch(createDialog(data))
      console.log(payload)
      const dialog = payload as DialogType
      if (dialog) {
        router.push(`/profile?tab=messages&id=${dialog.id}`)
      }
    } finally {
      setIsDisableContactButton(false)
    }
  }

  const toggleToCart = () => toggleCartItem(user.username, boilerPart.id, isInCart)

  if (!fullAdvertisement) return <h1 style={{ padding: '100px 0', textAlign: 'center' }}>Loading...</h1>

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__wrapper} ${darkModeClass}`}>
          <div className={`${styles.part__top}`}>
            <h2 className={`${styles.part__title} ${darkModeClass}`}>{fullAdvertisement.title}</h2>
            <div>
              <span className={`${styles.part__actions} ${darkModeClass}`}>
                {auth?.role !== 'USER' && (
                  <span
                    style={{ marginRight: '4px' }}
                    title="Змінити статус оголошення"
                    onClick={() => changeAdStatus(fullAdvertisement.id)}
                  >
                    <ConfirmSvg darkModeClass={darkModeClass} />
                  </span>
                )}

                {auth?.id === fullAdvertisement.user.id && (
                  <span title="Редагувати оголошення">
                    <Edit2Svg darkModeClass={darkModeClass} />
                  </span>
                )}

                {canDeleteAdvertisement(auth, fullAdvertisement.user.id) && (
                  <span title="Видалити оголошення" onClick={() => onDeleteAdvertisement(fullAdvertisement.id)}>
                    <GarbageSvg darkModeClass={darkModeClass} />
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className={styles.part__inner}>
            <PartImagesList fullAdvertisement={fullAdvertisement} />

            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(fullAdvertisement.price || 0)} грн.
              </span>

              <span className={styles.part__info__stock}>
                {fullAdvertisement.status === 'АКТИВНЕ' ? (
                  <span className={styles.part__info__stock__success}>{fullAdvertisement.status}</span>
                ) : (
                  <span className={styles.part__info__stock__not}>{fullAdvertisement.status}</span>
                )}
              </span>

              {/* <span className={styles.part__info__code}>Артикул: {boilerPart.vendor_code}</span> */}

              <div style={{ marginBottom: '24px' }}>
                <span className={catalogStyles.catalog__list__item__code}>
                  {/* Київ, Шевченківський - 10 жовтня 2024 р. */}
                  Опубліковано: {formatDate(fullAdvertisement.createdAt)}
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <SpeedometerSvg />
                  {fullAdvertisement.mileage} тис.км.
                  {/* 2020 115 тис.км. */}
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <EngineSvg />
                  {fullAdvertisement.engineVolume}
                  {/* 2.50 л. */} л.
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

              <div className={styles.part__user__wrapper}>
                {fullAdvertisement.user.avatarUrl ? (
                  <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${fullAdvertisement.user.avatarUrl}`} />
                ) : (
                  <div className={styles.part__user__image}>{fullAdvertisement.user.username[0]}</div>
                )}
                <div className={`${styles.part__user__inner} ${darkModeClass}`}>
                  <p>ПРОДАВЕЦЬ:</p>
                  <span>{fullAdvertisement.user.username}</span>
                </div>
              </div>

              {auth?.id !== fullAdvertisement.user.id && (
                <button
                  onClick={contactToSeller}
                  disabled={isDisableContactButton}
                  className={`${styles.part__info__btn} ${isInCart ? styles.in_cart : ''}`}
                  style={{ backgroundColor: '#1c629e', boxShadow: '0px 0px 30px rgba(28, 98, 158, 0.3)' }}
                >
                  {isDisableContactButton ? (
                    <span className={spinnerStyles.spinner} style={{ top: 10, left: '45%' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#fff', marginRight: '8px' }}>Зв'язатись з продавцем</span>
                      <SendMessageSvg />
                    </div>
                  )}
                </button>
              )}

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
