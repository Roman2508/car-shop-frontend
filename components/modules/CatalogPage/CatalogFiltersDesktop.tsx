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
import { ICatalogFilterDesktopProps, IFilterCheckboxItem } from '@/types/catalog'
import FilterAccordion from './FilterAccordion'
import { useSelector } from 'react-redux'
import { filtersSelector } from '@/redux/filter/filterSlice'

const CatalogFiltersDesktop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  spinner,
  resetFilters,
  applyFilters,
}: ICatalogFilterDesktopProps) => {
  const mode = useStore($mode)

  const { filters } = useSelector(filtersSelector)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3 className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>Фильтры</h3>
      <div className={styles.filters__boiler_manufacturers}>
        {/* <FilterManufacturerAccordion
          manufacturersList={boilerManufacturers}
          title="Производитель котлов"
          updateManufacturer={updateBoilerManufacturer}
          setManufacturer={setBoilerManufacturers}
        /> */}
      </div>

      <div className={styles.filters__price}>
        <Accordion
          title="Цена"
          titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
          arrowOpenClass={styles.open}
        >
          <div className={styles.filters__manufacturer__inner}>
            <PriceRange
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
            />
            <div style={{ height: 24 }} />
          </div>
        </Accordion>
      </div>

      <b style={{ display: 'block', marginBottom: '10px', textAlign: 'center', border: '1px solid black' }}>ПРОБІГ</b>
      <b style={{ display: 'block', marginBottom: '10px', textAlign: 'center', border: '1px solid black' }}>РІК ВИПУСКУ</b>

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

      <div className={styles.filters__actions}>
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
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
