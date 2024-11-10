import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setMode, themeSelector } from '@/redux/theme/themeSlice'

export const useTheme = () => {
  const dispatch = useDispatch()

  const { mode } = useSelector(themeSelector)

  const toggleTheme = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', JSON.stringify('light'))
      dispatch(setMode('light'))
    } else {
      localStorage.setItem('mode', JSON.stringify('dark'))
      dispatch(setMode('dark'))
    }
  }

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem('mode') as string)

    if (localTheme) {
      dispatch(setMode(localTheme))
    }
  }, [])

  return { toggleTheme }
}
