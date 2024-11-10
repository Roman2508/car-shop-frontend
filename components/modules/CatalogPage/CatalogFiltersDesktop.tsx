import { useSelector } from 'react-redux'

import PriceRange from './PriceRange'
import MileageRange from './MileageRange'
import FilterAccordion from './FilterAccordion'
import YearOfReleaseRange from './YearOfReleaseRange'
import styles from '@/styles/catalog/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import { filtersSelector } from '@/redux/filter/filterSlice'
import Accordion from '@/components/elements/Accordion/Accordion'

interface ICatalogFilterDesktopProps {
  closePopup?: VoidFunction
  priceRange: [number, number]
  mileageRange: [number, number]
  yearOfReleaseRange: [number, number]
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
  setMileageRange: React.Dispatch<React.SetStateAction<[number, number]>>
  setYearOfReleaseRange: React.Dispatch<React.SetStateAction<[number, number]>>
}

const CatalogFiltersDesktop: React.FC<ICatalogFilterDesktopProps> = ({
  priceRange,
  setPriceRange,
  mileageRange,
  setMileageRange,
  yearOfReleaseRange,
  setYearOfReleaseRange,
  closePopup,
}) => {
  const { mode } = useSelector(themeSelector)

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

      {filters.map((el) => (
        <div className={styles.filters__boiler_manufacturers} key={el.label}>
          <FilterAccordion title={el.label} filterItems={el.items} />
        </div>
      ))}
    </div>
  )
}

export default CatalogFiltersDesktop
