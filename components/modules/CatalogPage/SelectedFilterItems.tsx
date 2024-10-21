import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { AnimatePresence, motion } from 'framer-motion'
import { IManufacturersBlockProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import { IFilterItem } from '@/redux/filter/FilterTypes'
import SelectedFilterBlockItem from './SelectedFilterBlockItem'
import { filterKeys } from '@/utils/getFilterKey'

interface ISelectedFilterItemsProps {
  label: keyof typeof filterKeys
  selectedItems: IFilterItem[]
}

const SelectedFilterItems: React.FC<ISelectedFilterItemsProps> = ({ label, selectedItems }) => {
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
          {selectedItems.map((item) => (
            <SelectedFilterBlockItem key={item.id} item={item} label={label} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default SelectedFilterItems
