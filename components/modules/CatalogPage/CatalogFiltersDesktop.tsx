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
import FilterManufacturerAccordion from './FilterManufacturerAccordion'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { ICatalogFilterDesktopProps, IFilterCheckboxItem } from '@/types/catalog'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'

// Лакове покриття
const varnishCoating = [
  { checked: false, id: '1', title: 'Як нове, без видимих слідів експлуатації', event: '' },
  { checked: false, id: '2', title: 'Професійно відремонтоварі сліди експлуатації', event: '' },
  { checked: false, id: '3', title: 'Незначні сліди експлуатації (дрібні подряпини, сколи)', event: '' },
  { checked: false, id: '4', title: "Не відремонтовані сліди експлуатації (подряпини, вм'ятини і т.д.)", event: '' },
  { checked: false, id: '5', title: 'Потрібно відновлення (фарбування, заміна деталей, зварювання)', event: '' },
] as unknown as IFilterCheckboxItem[]

// Технічний стан
const technicalCondition = [
  { checked: false, id: '1', title: 'На ходу, технічно справна', event: '' },
  { checked: false, id: '2', title: 'Не бита', event: '' },
  { checked: false, id: '3', title: 'Не пофарбована', event: '' },
  { checked: false, id: '4', title: 'Гаражне зберігання', event: '' },
  { checked: false, id: '5', title: 'Перший власник', event: '' },
  { checked: false, id: '6', title: 'Сервісна книжка', event: '' },
  { checked: false, id: '7', title: 'Потребує кузовного ремонту', event: '' },
  { checked: false, id: '8', title: 'Потребує ремонту ходової', event: '' },
  { checked: false, id: '9', title: 'Потребує ремонту двигуна', event: '' },
  { checked: false, id: '10', title: 'Після ДТП', event: '' },
  { checked: false, id: '11', title: 'Не на ходу', event: '' },
] as unknown as IFilterCheckboxItem[]

// Комфорт (
//   - Електропакет
//   - Електросклопідйомники
//   - Кондиціонер
//   - Парктроник
//   - Бортовий комп'ютер
//   - Датчик світла
//   - Запуск кнопкою
//   - Клімат контроль
//   - Шкіряний салон
//   - Круїз контроль
//   - Люк
//   - Панорамний дах
//   - Ел. регулювання сидінь
//   - Камера заднього виду
//   - Передня камера
//   - Мультируль
//   - Омивач фар
//   - Підігрів дзеркал
//   - Обігрів керма
//   - Підсилювач керма
//   - Підігрів седінь
//   - Тонування скла
//   - Пам'ять сидінь
//   - Датчик дощу
//   - Алькантара
// )

// Комфорт
const Comfort = [
  { checked: false, id: '1', title: 'Електропакет', event: '' },
  { checked: false, id: '2', title: 'Електросклопідйомники', event: '' },
  { checked: false, id: '3', title: 'Кондиціонер', event: '' },
  { checked: false, id: '4', title: 'Парктроник', event: '' },
  { checked: false, id: '5', title: "Бортовий комп'ютер", event: '' },
  { checked: false, id: '6', title: 'Датчик світла', event: '' },
  { checked: false, id: '7', title: 'Запуск кнопкою', event: '' },
  { checked: false, id: '8', title: 'Клімат контроль', event: '' },
  { checked: false, id: '9', title: 'Шкіряний салон', event: '' },
  { checked: false, id: '10', title: 'Круїз контроль', event: '' },
  { checked: false, id: '11', title: 'Люк', event: '' },
  { checked: false, id: '12', title: 'Панорамний дах', event: '' },
  { checked: false, id: '13', title: 'Ел. регулювання сидінь', event: '' },
  { checked: false, id: '14', title: 'Камера заднього виду', event: '' },
  { checked: false, id: '15', title: 'Передня камера', event: '' },
  { checked: false, id: '16', title: 'Мультируль', event: '' },
  { checked: false, id: '17', title: 'Омивач фар', event: '' },
  { checked: false, id: '18', title: 'Підігрів дзеркал', event: '' },
  { checked: false, id: '19', title: 'Обігрів керма', event: '' },
  { checked: false, id: '20', title: 'Підсилювач керма', event: '' },
  { checked: false, id: '21', title: 'Підігрів седінь', event: '' },
  { checked: false, id: '22', title: 'Тонування скла', event: '' },
  { checked: false, id: '23', title: "Пам'ять сидінь", event: '' },
  { checked: false, id: '24', title: 'Датчик дощу', event: '' },
  { checked: false, id: '25', title: 'Алькантара', event: '' },
] as unknown as IFilterCheckboxItem[]

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
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3 className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>Фильтры</h3>
      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={boilerManufacturers}
          title="Производитель котлов"
          updateManufacturer={updateBoilerManufacturer}
          setManufacturer={setBoilerManufacturers}
        />
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

      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          manufacturersList={partsManufacturers}
          title="Производитель запчастей"
          updateManufacturer={updatePartsManufacturer}
          setManufacturer={setPartsManufacturers}
        />
      </div>

      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          title="Лакове покриття"
          manufacturersList={varnishCoating}
          setManufacturer={setPartsManufacturers}
          updateManufacturer={updatePartsManufacturer}
        />
      </div>

      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          title="Технічний стан"
          manufacturersList={technicalCondition}
          setManufacturer={setPartsManufacturers}
          updateManufacturer={updatePartsManufacturer}
        />
      </div>

      <div className={styles.filters__boiler_manufacturers}>
        <FilterManufacturerAccordion
          title="Комфорт"
          manufacturersList={Comfort}
          setManufacturer={setPartsManufacturers}
          updateManufacturer={updatePartsManufacturer}
        />
      </div>

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
