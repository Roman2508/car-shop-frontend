import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { $mode } from '@/context/mode'
import { IFilterCheckboxItem } from '@/types/catalog'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import styles from '@/styles/catalog/index.module.scss'
import React from 'react'
import { useAppDispatch } from '@/redux/store'
import { setFilter } from '@/redux/filter/filterSlice'
import getFilterKey, { filterKeys } from '@/utils/getFilterKey'
import { useRouter } from 'next/router'
import { IFilter } from '@/redux/filter/FilterTypes'

interface ISelectedFilterBlockItemProps {
  setSelectedFilters: React.Dispatch<React.SetStateAction<IFilter[]>>
  label: keyof typeof filterKeys
  item: any
}

const SelectedFilterBlockItem: React.FC<ISelectedFilterBlockItemProps> = ({ item, label, setSelectedFilters }) => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const mode = useStore($mode)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const removeFilter = () => {
    dispatch(setFilter({ label, title: item.title }))

    setSelectedFilters((prev) => {
      const newFilters = prev.map((el) => {
        if (el.label === label) {
          const items = el.items.filter((i) => i.title !== item.title)

          if (!items.length) {
            const query = router.query
            delete query[getFilterKey(el.label)]
            router.push({ query: { ...query } }, undefined, { shallow: true })
            return
          }

          return { ...el, items }
        }
        return el
      })

      return newFilters.filter((el) => !!el)
    })
  }

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.manufacturers__list__item} ${darkModeClass}`}
    >
      <span className={styles.manufacturers__list__item__text}>{item.title}</span>
      <button className={styles.manufacturers__list__item__btn} onClick={removeFilter}>
        <span>
          <DeleteSvg />
        </span>
      </button>
    </motion.li>
  )
}

export default SelectedFilterBlockItem
