import { useStore } from 'effector-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { $mode } from '@/context/mode'
import FiltersPopup from './FiltersPopup'
import FiltersPopupTop from './FiltersPopupTop'
import styles from '@/styles/catalog/index.module.scss'
// import { ICatalogFilterMobileProps } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import Accordion from '@/components/elements/Accordion/Accordion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PriceRange from './PriceRange'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { useClickAway } from 'react-use'

export interface ICatalogFilterMobileProps {
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
  spinner: boolean
  // applyFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
  // setIsPriceRangeChanged: (arg0: boolean) => void

  priceRange: [number, number]
  setPriceRange: Dispatch<SetStateAction<[number, number]>>
  yearOfReleaseRange: [number, number]
  setYearOfReleaseRange: Dispatch<SetStateAction<[number, number]>>
  mileageRange: [number, number]
  setMileageRange: Dispatch<SetStateAction<[number, number]>>
}

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  // applyFilters,
  filtersMobileOpen,
  // setIsPriceRangeChanged,
  priceRange,
  setPriceRange,
  yearOfReleaseRange,
  setYearOfReleaseRange,
  mileageRange,
  setMileageRange,
}: ICatalogFilterMobileProps) => {
  const drawerRef = React.useRef(null)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const [openBoilers, setOpenBoilers] = useState(false)
  const [openParts, setOpenParts] = useState(false)
  const handleOpenBoilers = () => setOpenBoilers(true)
  const handleCloseBoilers = () => setOpenBoilers(false)
  const handleOpenParts = () => setOpenParts(true)
  const handleCloseParts = () => setOpenParts(false)

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => item.checked)
  const isAnyPartsManufacturerChecked = partsManufacturers.some((item) => item.checked)
  const isMobile = useMediaQuery(820)

  const resetAllBoilerManufacturers = () =>
    setBoilerManufacturers(boilerManufacturers.map((item) => ({ ...item, checked: false })))

  const resetAllPartsManufacturers = () =>
    setPartsManufacturers(partsManufacturers.map((item) => ({ ...item, checked: false })))

  const applyFiltersAndClosePopup = () => {
    // applyFilters()
    // closePopup()
  }

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
        {/* ${filtersMobileOpen ? styles.open : ''} */}
        <div className={`${styles.catalog__bottom__filters__inner} ${filtersMobileOpen ? styles.open : ''}`}>
          <CatalogFiltersDesktop
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            // setIsPriceRangeChanged={setIsPriceRangeChanged}
            // resetFilterBtnDisabled={resetFilterBtnDisabled}
            closePopup={closePopup}
            mileageRange={mileageRange}
            setMileageRange={setMileageRange}
            yearOfReleaseRange={yearOfReleaseRange}
            setYearOfReleaseRange={setYearOfReleaseRange}
            spinner={spinner}
            // resetFilters={resetFilters}
            // applyFilters={applyFilters}
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
