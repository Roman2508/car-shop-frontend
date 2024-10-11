/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { $boilerPart } from '@/context/boilerPart'
import { $mode } from '@/context/mode'
import styles from '@/styles/part/index.module.scss'
import { filters } from '@/constans/filter'

const PartTabs = () => {
  const mode = useStore($mode)
  const boilerPart = useStore($boilerPart)
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
          <h3 className={`${styles.part__tabs__content__title} ${darkModeClass}`}>{boilerPart.name}</h3>
          <p className={`${styles.part__tabs__content__text} ${darkModeClass}`}>{boilerPart.description}</p>
        </motion.div>
      )}
      {showCompatibility && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.part__tabs__content}
        >
          {filters.map((el) => (
            <div key={el.label} style={{ marginBottom: '16px' }}>
              <b
                className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                style={{ fontWeight: 500, display: 'block' }}
              >
                {el.label}
              </b>

              {el.items.map((bage) => (
                <div className={styles.part__info__bage} key={bage.id}>
                  {bage.title}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default PartTabs
