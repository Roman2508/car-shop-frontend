/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from '@/styles/part/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'

const tagKeys = {
  carType: 'Тип автомобіля',
  mileage: 'Пробіг (км.)',
  сustomsСleared: 'Розмитнена',
  engineVolume: "Об'єм двигуна (л.)",
  theCarWasDrivenFrom: 'Авто пригнано з',
  model: 'Модель',
  yearOfRelease: 'Рік випуску',
  carBodyType: 'Тип кузова',
  seatsCount: 'Кількість місць',
  color: 'Колір',
  gearbox: 'Коробка передач',
  driveType: 'Тип приводу',
  fuelType: 'Тип палива',
  varnishCoating: 'Лакофарбове покриття',
  technicalCondition: 'Технічний стан',
  comfort: 'Комфорт',
  multimedia: 'Мультимедіа',
  security: 'Безпека',
} as { [key: string]: string }

const PartTabs = ({ fullAdvertisement }: { fullAdvertisement: AdvertisementType }) => {
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [showDescription, setShowDescription] = useState(true)
  const [showCompatibility, setShowCompatibility] = useState(false)

  const handleShowDescription = () => {
    setShowDescription(true)
    setShowCompatibility(false)
  }

  const handleShowCompatibility = () => {
    setShowDescription(false)
    setShowCompatibility(true)
  }

  const adTags = () => {
    const res = []
    for (const key in fullAdvertisement) {
      const notAllowedKeys = [
        'id',
        'title',
        'description',
        'price',
        'category',
        'subcategory',
        'photos',
        'createdAt',
        'user',
        'status',
      ]

      if (!notAllowedKeys.some((k) => k === key)) {
        // @ts-ignore
        res.push({ label: key, value: fullAdvertisement[key] })
      }
    }

    return res
  }

  return (
    <div className={styles.part__tabs}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button className={showDescription ? styles.active : ''} onClick={handleShowDescription}>
          Опис
        </button>
        <button className={showCompatibility ? styles.active : ''} onClick={handleShowCompatibility}>
          Деталі
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          <h3 className={`${styles.part__tabs__content__title} ${darkModeClass}`}>{fullAdvertisement.title}</h3>
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>{fullAdvertisement.description}</p>
        </motion.div>
      )}

      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          {adTags().map((el) => {
            if (el.value) {
              return (
                <div key={el.label} style={{ marginBottom: '16px' }}>
                  <b
                    className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                    style={{ fontWeight: 500, display: 'block' }}
                  >
                    {tagKeys[el.label]}
                  </b>

                  {typeof el.value === 'string' || typeof el.value === 'number' ? (
                    <div className={styles.part__info__bage}>{el.value}</div>
                  ) : (
                    el.value?.map((bage: string | number) => (
                      <div className={styles.part__info__bage} key={bage}>
                        {bage}
                      </div>
                    ))
                  )}
                </div>
              )
            }
          })}
        </motion.div>
      )}
    </div>
  )
}

export default PartTabs
