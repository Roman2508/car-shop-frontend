import { AnimatePresence, motion } from 'framer-motion'
import styles from '@/styles/catalog/index.module.scss'
import { IFilter, IFilterItem } from '@/redux/filter/FilterTypes'
import SelectedFilterBlockItem from './SelectedFilterBlockItem'
import { filterKeys } from '@/utils/getFilterKey'
import { useSelector } from 'react-redux'
import { themeSelector } from '@/redux/theme/themeSlice'

interface ISelectedFilterItemsProps {
  label: keyof typeof filterKeys
  selectedItems: IFilterItem[]
  setSelectedFilters: React.Dispatch<React.SetStateAction<IFilter[]>>
}

const SelectedFilterItems: React.FC<ISelectedFilterItemsProps> = ({ label, setSelectedFilters, selectedItems }) => {
  const { mode } = useSelector(themeSelector)
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
            <SelectedFilterBlockItem key={item.id} item={item} label={label} setSelectedFilters={setSelectedFilters} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default SelectedFilterItems
