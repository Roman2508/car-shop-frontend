import { IFilterCheckboxItem } from '@/types/catalog'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import { setFilter } from '@/redux/filter/filterSlice'
import { useAppDispatch } from '@/redux/store'
import { themeSelector } from '@/redux/theme/themeSlice'
import { useSelector } from 'react-redux'

const FilterCheckboxItem = ({ title, checked, label }: any) => {
  const dispatch = useAppDispatch()

  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <li className={`${styles.filters__manufacturer__list__item} ${darkModeClass}`}>
      <label>
        <input type="checkbox" checked={checked} onChange={() => dispatch(setFilter({ title, label }))} />
        <span>{title}</span>
      </label>
    </li>
  )
}

export default FilterCheckboxItem
