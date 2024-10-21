import { $mode } from '@/context/mode'
import { IFilterCheckboxItem } from '@/types/catalog'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import { setFilter } from '@/redux/filter/filterSlice'
import { useAppDispatch } from '@/redux/store'

const FilterCheckboxItem = ({ title, checked, label }: any) => {
  const dispatch = useAppDispatch()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  // const handleFilterChange = () => event({ checked: !checked, id } as IFilterCheckboxItem)

  return (
    <li className={`${styles.filters__manufacturer__list__item} ${darkModeClass}`}>
      <label>
        <input type="checkbox" checked={checked} onChange={() => dispatch(setFilter({ title, label }))} />
        {/* <input type="checkbox" checked={checked} onChange={handleFilterChange} /> */}
        <span>{title}</span>
      </label>
    </li>
  )
}

export default FilterCheckboxItem
