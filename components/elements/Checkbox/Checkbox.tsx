import { $mode } from '@/context/mode'
import { IFilterCheckboxItem } from '@/types/catalog'
import { useStore } from 'effector-react'
import styles from '@/styles/create-ad/index.module.scss'

interface ICheckboxProps {
  setCheckboxValue: (groupKey: string, key: string) => void
  title: string
  checked: boolean
  id?: string
  event: any
  groupKey: string
  // event: Event<IFilterCheckboxItem>
}

// const Checkbox = ({ title, checked, id, event }: IFilterCheckboxItem) => {
const Checkbox = ({ title, checked, id, event, setCheckboxValue, groupKey }: ICheckboxProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleFilterChange = () => event({ checked: !checked, id } as IFilterCheckboxItem)

  return (
    <li className={`${styles.checkbox__list__item} ${darkModeClass}`}>
      <label>
        <input type="checkbox" checked={checked} onChange={() => setCheckboxValue(groupKey, title)} />
        {/* <input type="checkbox" checked={checked} onChange={handleFilterChange} /> */}
        <span>{title}</span>
      </label>
    </li>
  )
}

export default Checkbox
