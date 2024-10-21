import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IFilterManufacturerAccordionProps } from '@/types/catalog'
import Accordion from '@/components/elements/Accordion/Accordion'
import FilterCheckboxItem from './FilterCheckboxItem'
import styles from '@/styles/catalog/index.module.scss'
import { IFilter, IFilterItem } from '@/redux/filter/FilterTypes'

interface IFilterAccordionProps {
  filterItems: IFilterItem[]
  title: string | false
  // setManufacturer: Event<IFilterCheckboxItem[]>
  // updateManufacturer: Event<IFilterCheckboxItem>
}

const FilterAccordion: React.FC<IFilterAccordionProps> = ({ filterItems, title }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobile = useMediaQuery(820)

  // const chooseAllManufacturers = () => setManufacturer(items.map((item) => ({ ...item, checked: true })))

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}
    >
      <div className={styles.filters__manufacturer__inner}>
        <button className={styles.filters__manufacturer__select_all} onClick={() => {}}>
          Вибрати все
        </button>
        <ul className={styles.filters__manufacturer__list}>
          {filterItems?.map((item) => (
            <FilterCheckboxItem title={item.title} label={title} id={item.id} key={item.id} checked={item.checked} />
          ))}
        </ul>
        <div style={{ height: 24 }} />
      </div>
    </Accordion>
  )
}

export default FilterAccordion
