import React, { useEffect } from 'react'

import { formatPrice } from '@/utils/common'
import styles from '@/styles/part/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartTabs from '@/components/modules/PartPage/PartTabs'
import catalogStyles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import PartAccordion from '@/components/modules/PartPage/PartAccordion'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import SendMessageSvg from '@/components/elements/SendMessageSvg/SendMessageSvg'
import FuelSvg from '@/components/elements/FuelSvg/FuelSvg'
import EngineSvg from '@/components/elements/EngineSvg/EngineSvg'
import GearBoxSvg from '@/components/elements/GearBoxSvg/GearBoxSvg'
import SpeedometerSvg from '@/components/elements/SpeedometerSvg/SpeedometerSvg'
import GarbageSvg from '@/components/elements/GarbageSvg/GarbageSvg'
import Edit2Svg from '@/components/elements/EditSvg/Edit2Svg'
import ConfirmSvg from '@/components/elements/ConfirmSvg/ConfirmSvg'
import { advertisementsSelector, clearFullAdvertisements } from '@/redux/advertisements/advertisementsSlice'
import { useSelector } from 'react-redux'
import { formatDate } from '@/utils/formatDate'
import { useAppDispatch } from '@/redux/store'
import {
  acceptAdvertisement,
  deleteAdvertisement,
  getBestsellers,
} from '@/redux/advertisements/advertisementsAsyncActions'
import { useRouter } from 'next/router'
import { AuthType } from '@/redux/auth/authTypes'
import { authSelector } from '@/redux/auth/authSlice'
import { createImageUrl } from '@/utils/createImageUrl'
import { themeSelector } from '@/redux/theme/themeSlice'
import { DialogType } from '@/redux/dialogs/dialogsTypes'
import { createDialog } from '@/redux/dialogs/dialogsAsyncActions'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'

const PartPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { fullAdvertisement } = useSelector(advertisementsSelector)

  const [isDisableContactButton, setIsDisableContactButton] = React.useState(false)

  const { mode } = useSelector(themeSelector)

  const isMobile = useMediaQuery(850)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [advertisements, setAdvertisements] = React.useState<AdvertisementType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { payload }: { payload: any } = await dispatch(getBestsellers())
      setAdvertisements(payload[0])
    }
    fetchData()
  }, [router.asPath])

  useEffect(() => {
    return () => {
      dispatch(clearFullAdvertisements())
    }
  }, [])

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
    dispatch(acceptAdvertisement(id))
  }

  const contactToSeller = async () => {
    try {
      setIsDisableContactButton(true)
      if (!auth || !fullAdvertisement) return
      const data = { members: [auth.id, fullAdvertisement.user.id], advertisement: fullAdvertisement.id }

      const { payload } = await dispatch(createDialog(data))

      const dialog = payload as DialogType
      if (dialog) {
        router.push(`/profile?tab=messages&id=${dialog.id}`)
      }
    } finally {
      setIsDisableContactButton(false)
    }
  }

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
                  <span title="Редагувати оголошення" onClick={() => router.push(`/create-ad/${fullAdvertisement.id}`)}>
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

              <div style={{ marginBottom: '24px' }}>
                <span className={catalogStyles.catalog__list__item__code}>
                  Опубліковано: {formatDate(fullAdvertisement.createdAt)}
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <SpeedometerSvg />
                  {fullAdvertisement.mileage} тис.км.
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <EngineSvg />
                  {fullAdvertisement.engineVolume}
                  л.
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <GearBoxSvg />
                  {fullAdvertisement.gearbox}
                </span>

                <span className={catalogStyles.catalog__list__item__details}>
                  <FuelSvg />
                  {fullAdvertisement.fuelType}
                </span>
              </div>

              <div className={styles.part__user__wrapper}>
                {fullAdvertisement.user.avatarUrl ? (
                  <img src={createImageUrl(fullAdvertisement.user.avatarUrl)} alt="user avatar" />
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
                  className={`${styles.part__info__btn}`}
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
                {/* <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>1121221</p> */}
              </div>
            </PartAccordion>
          </div>
        )}
        <div className={styles.part__bottom}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>Схожі оголошення</h2>
          <DashboardSlider goToPartPage items={advertisements} />
        </div>
      </div>
    </section>
  )
}

export default PartPage
