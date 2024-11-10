import { useStore } from 'effector-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import FiltersPopup from './FiltersPopup'
import FiltersPopupTop from './FiltersPopupTop'
import styles from '@/styles/catalog/index.module.scss'
// import { ICatalogFilterMobileProps } from '@/types/catalog'
import Accordion from '@/components/elements/Accordion/Accordion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PriceRange from './PriceRange'
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

          {/* <FiltersPopupTop
          resetBtnText="Сбросить все"
          title="Фильтры"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        /> */}

          {/* <div className={styles.filters__boiler_manufacturers}>
          <button className={`${styles.filters__manufacturer__btn} ${darkModeClass}`} onClick={handleOpenBoilers}>
            Производитель котлов
          </button>
          <FiltersPopup
            openPopup={openBoilers}
            title="Производитель котлов"
            handleClosePopup={handleCloseBoilers}
            manufacturersList={boilerManufacturers}
            setManufacturer={setBoilerManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            updateManufacturer={updateBoilerManufacturer}
            resetAllManufacturers={resetAllBoilerManufacturers}
            resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
          />
        </div> */}

          {/* <div className={styles.filters__boiler_manufacturers}>
          <button className={`${styles.filters__manufacturer__btn} ${darkModeClass}`} onClick={handleOpenParts}>
            Производитель запчастей
          </button>
          <FiltersPopup
            openPopup={openParts}
            title="Производитель запчастей"
            handleClosePopup={handleCloseParts}
            manufacturersList={partsManufacturers}
            setManufacturer={setPartsManufacturers}
            applyFilters={applyFiltersAndClosePopup}
            updateManufacturer={updatePartsManufacturer}
            resetAllManufacturers={resetAllPartsManufacturers}
            resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
          />
        </div> */}

          {/* <div className={styles.filters__price}>
          <Accordion
            title="Цена"
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide_arrow}
            isMobileForFilters={isMobile}
          >
            <div className={styles.filters__manufacturer__inner}>
              <PriceRange
                priceRange={priceRange as [number, number]}
                setPriceRange={setPriceRange as Dispatch<SetStateAction<[number, number]>>}
              />
              <div style={{ height: 24 }} />
            </div>
          </Accordion>
        </div> */}
        </div>
        {/* <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          onClick={applyFiltersAndClosePopup}
          disabled={resetFilterBtnDisabled}
        >
          {spinner ? <span className={spinnerStyles.spinner} style={{ top: 6, left: '47%' }} /> : 'Показать'}
        </button>
      </div> */}
      </div>
    </>
  )
}

export default CatalogFiltersMobile
