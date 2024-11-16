import React, { Dispatch, SetStateAction } from 'react'
import styles from '@/styles/catalog/index.module.scss'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { useClickAway } from 'react-use'
import { themeSelector } from '@/redux/theme/themeSlice'
import { useSelector } from 'react-redux'

export interface ICatalogFilterMobileProps {
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
  priceRange: [number, number]
  setPriceRange: Dispatch<SetStateAction<[number, number]>>
  yearOfReleaseRange: [number, number]
  setYearOfReleaseRange: Dispatch<SetStateAction<[number, number]>>
  mileageRange: [number, number]
  setMileageRange: Dispatch<SetStateAction<[number, number]>>
}

const CatalogFiltersMobile = ({
  closePopup,
  priceRange,
  mileageRange,
  setPriceRange,
  setMileageRange,
  filtersMobileOpen,
  yearOfReleaseRange,
  setYearOfReleaseRange,
}: ICatalogFilterMobileProps) => {
  const drawerRef = React.useRef(null)

  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useClickAway(drawerRef, () => {
    closePopup()
    document.querySelector('.body')?.classList.remove('overflow-hidden')
  })

  return (
    <>
      {filtersMobileOpen && (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            height: '100%',
            width: '100%',
            zIndex: 10,
            left: 0,
            top: 0,
          }}
        />
      )}

      <div className={`${styles.catalog__bottom__filters} ${darkModeClass} `} ref={drawerRef}>
        <div className={`${styles.catalog__bottom__filters__inner} ${filtersMobileOpen ? styles.open : ''}`}>
          <CatalogFiltersDesktop
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            closePopup={closePopup}
            mileageRange={mileageRange}
            setMileageRange={setMileageRange}
            yearOfReleaseRange={yearOfReleaseRange}
            setYearOfReleaseRange={setYearOfReleaseRange}
          />
        </div>
      </div>
    </>
  )
}

export default CatalogFiltersMobile
