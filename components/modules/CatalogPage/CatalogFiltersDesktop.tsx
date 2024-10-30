import { useStore } from 'effector-react'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturers,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import { $mode } from '@/context/mode'
import FilterManufacturerAccordion from './FilterAccordion'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { IFilterCheckboxItem } from '@/types/catalog'
import FilterAccordion from './FilterAccordion'
import { useSelector } from 'react-redux'
import { filtersSelector } from '@/redux/filter/filterSlice'
import MileageRange from './MileageRange'
import YearOfReleaseRange from './YearOfReleaseRange'

interface ICatalogFilterDesktopProps {
  priceRange: [number, number]
  mileageRange: [number, number]
  yearOfReleaseRange: [number, number]
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
  setMileageRange: React.Dispatch<React.SetStateAction<[number, number]>>
  setYearOfReleaseRange: React.Dispatch<React.SetStateAction<[number, number]>>
  spinner: boolean
  closePopup?: VoidFunction
  // applyFilters: VoidFunction
}

const CatalogFiltersDesktop: React.FC<ICatalogFilterDesktopProps> = ({
  priceRange,
  setPriceRange,
  mileageRange,
  setMileageRange,
  yearOfReleaseRange,
  setYearOfReleaseRange,
  closePopup,
  spinner,
}) => {
  const mode = useStore($mode)

  const { filters } = useSelector(filtersSelector)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        onClick={() => closePopup && closePopup()}
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        Фільтри
      </h3>

      <div className={styles.filters__price}>
        <Accordion
          title="Ціна"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>

      <div className={styles.filters__price}>
        <Accordion
          title="Пробіг"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <MileageRange mileageRange={mileageRange} setMileageRange={setMileageRange} />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>

      <div className={styles.filters__price}>
        <Accordion
          title="Рік випуску"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <YearOfReleaseRange yearOfReleaseRange={yearOfReleaseRange} setYearOfReleaseRange={setYearOfReleaseRange} />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>

      {/* <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partsManufacturers}
          title="Производитель запчастей"
          updateManufacturer={updatePartsManufacturer}
          setManufacturer={setPartsManufacturers}
        /> 
      </div> */}

      {filters.map((el) => (
        <div className={styles.filters__boiler_manufacturers} key={el.label}>
          <FilterAccordion title={el.label} filterItems={el.items} />
        </div>
      ))}

      {/* <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={spinner || resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          {spinner ? <span className={spinnerStyles.spinner} style={{ top: 6, left: '47%' }} /> : 'Показать'}
        </button>
        <button className={styles.filters__actions__reset} disabled={resetFilterBtnDisabled} onClick={resetFilters}>
          Сбросить
        </button>
      </div> */}
    </div>
  )
}

export default CatalogFiltersDesktop
