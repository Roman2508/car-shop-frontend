import { useSelector } from 'react-redux'
import { themeSelector } from '@/redux/theme/themeSlice'
import styles from '@/styles/create-ad/index.module.scss'

interface ICheckboxProps {
  setCheckboxValue: (groupKey: string, key: string) => void
  title: string
  checked: boolean
  id?: string
  event: any
  groupKey: string
}

const Checkbox = ({ title, checked, setCheckboxValue, groupKey }: ICheckboxProps) => {
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <li className={`${styles.checkbox__list__item} ${darkModeClass}`}>
      <label>
        <input type="checkbox" checked={checked} onChange={() => setCheckboxValue(groupKey, title)} />
        <span>{title}</span>
      </label>
    </li>
  )
}

export default Checkbox
