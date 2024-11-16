import { useSelector } from 'react-redux'

import { IFiltersPopupTop } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'

const FiltersPopupTop = ({
  title,
  closePopup,
  resetBtnText,
  resetFilters,
  resetFilterBtnDisabled,
}: IFiltersPopupTop) => {
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
      <button onClick={closePopup} className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>
        {title}
      </button>
      <button
        className={styles.catalog__bottom__filters__reset}
        onClick={resetFilters}
        disabled={resetFilterBtnDisabled}
      >
        {resetBtnText}
      </button>
    </div>
  )
}

export default FiltersPopupTop
