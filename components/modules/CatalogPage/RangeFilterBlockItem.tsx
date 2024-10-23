import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { $mode } from '@/context/mode'
import { IFilterCheckboxItem } from '@/types/catalog'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import styles from '@/styles/catalog/index.module.scss'
import React from 'react'
import { useAppDispatch } from '@/redux/store'
import { setFilter } from '@/redux/filter/filterSlice'
import { filterKeys } from '@/utils/getFilterKey'

interface IRangeFilterBlockItemProps {
  label: string
  title: string
  onClick: () => void
}

export const RangeFilterBlockItem: React.FC<IRangeFilterBlockItemProps> = ({ label, title, onClick }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers} ${darkModeClass}`}
    >
      <h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>{label}</h3>
      <ul className={styles.manufacturers__list}>
        <AnimatePresence>
          <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.manufacturers__list__item} ${darkModeClass}`}
          >
            <span className={styles.manufacturers__list__item__text}>{title}</span>
            <button className={styles.manufacturers__list__item__btn} onClick={onClick}>
              <span>
                <DeleteSvg />
              </span>
            </button>
          </motion.li>
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}
