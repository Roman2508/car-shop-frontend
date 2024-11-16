import { useMediaQuery } from '@/hooks/useMediaQuery'
import Accordion from '@/components/elements/Accordion/Accordion'
import FilterCheckboxItem from './FilterCheckboxItem'
import styles from '@/styles/catalog/index.module.scss'
import { IFilterItem } from '@/redux/filter/FilterTypes'
import { useSelector } from 'react-redux'
import { themeSelector } from '@/redux/theme/themeSlice'

interface IFilterAccordionProps {
  filterItems: IFilterItem[]
  title: string | false
}

const FilterAccordion: React.FC<IFilterAccordionProps> = ({ filterItems, title }) => {
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobile = useMediaQuery(820)

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}
    >
      <div className={styles.filters__manufacturer__inner}>
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
