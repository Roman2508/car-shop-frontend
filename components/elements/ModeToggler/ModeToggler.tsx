import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useTheme } from '../../../hooks/useTheme'
import { themeSelector } from '@/redux/theme/themeSlice'
import styles from '@/styles/modeToggler/index.module.scss'

const ModeToggler = () => {
  const { toggleTheme } = useTheme()
  const { mode } = useSelector(themeSelector)

  const handleToggleMode = () => {
    toggleTheme()
    document.body.classList.toggle('dark_mode')
  }

  useEffect(() => {
    document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body')
  }, [mode])

  return (
    <div className={styles.theme}>
      <input className={styles.theme__input} type="checkbox" checked={mode === 'light'} onChange={handleToggleMode} />
    </div>
  )
}

export default ModeToggler
