import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import { useAppDispatch } from '@/redux/store'
import { themeSelector } from '@/redux/theme/themeSlice'
import authStyles from '@/styles/auth/index.module.scss'
import styles from '@/styles/dashboard/index.module.scss'
import { MAX_PRICE, MIN_PRICE } from '../CatalogPage/CatalogPage'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { getBestsellers, getNewAdvertisements } from '@/redux/advertisements/advertisementsAsyncActions'

const popularFilters = {
  'Нові моделі': 'first=new',
  'Старі моделі': 'first=old',
  'Ціна (менше 100 000 грн)': `priceFrom=${MIN_PRICE}&priceTo=100000`,
  'Ціна (100 000 грн - 500 000 грн)': `priceFrom=100000&priceTo=500000`,
  'Ціна (понад 500 000 грн)': `priceFrom=500000&priceTo=${MAX_PRICE}`,
  Седан: 'carBodyType=Седан',
  Купе: 'carBodyType=Купе',
  Позашляховик: 'carBodyType=Позашляховик',
  Універсал: 'carBodyType=Універсал',
  Електричний: 'fuelType=Електро',
  Дизель: 'fuelType=Дизель',
  Бензин: 'fuelType=Бензин',
  Повнопривідний: 'driveType=Повний',
  Передньопривідний: 'driveType=Передній',
  Задньопривідний: 'driveType=Задній',
} as const

type FilterKeys = keyof typeof popularFilters
type FilterValues = (typeof popularFilters)[FilterKeys]

const DashboardPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { mode } = useSelector(themeSelector)

  const [search, setSearch] = React.useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const [newParts, setNewParts] = useState<AdvertisementType[]>([])
  const [bestsellers, setBestsellers] = useState<AdvertisementType[]>([])

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleChangeFilters = (filter: FilterValues) => {
    setSelectedFilters((prev) => {
      const isExist = prev.find((el) => el === filter)

      if (isExist) {
        return prev.filter((el) => el !== filter)
      }

      if (filter === 'first=old') {
        const filters = prev.filter((el) => el !== 'first=new')
        return [...filters, filter]
      }
      if (filter === 'first=new') {
        const filters = prev.filter((el) => el !== 'first=old')
        return [...filters, filter]
      }

      return [...prev, filter]
    })
  }

  const onFilterAdvertisements = () => {
    let str = ''

    let first: string = ''
    const prices: string[] = []
    const carBodyType: string[] = []
    const fuelType: string[] = []
    const driveType: string[] = []

    selectedFilters.forEach((filter) => {
      const res = filter.split(/[=&]/)

      switch (res[0]) {
        case 'carBodyType':
          carBodyType.push(res[1])
          break
        case 'fuelType':
          fuelType.push(res[1])
          break
        case 'driveType':
          driveType.push(res[1])
          break
        case 'priceFrom':
          prices.push(res[1])
          prices.push(res[3])
          break
        case 'first':
          first = res[1]
          break
      }
    })

    if (first) {
      str = `?first=${first}`
    }

    if (search) {
      str = str ? `${str}&title=${search}` : `?&title=${search}`
    }

    if (prices.length) {
      const minPrice = Math.min(...prices.map((el) => Number(el)))
      const maxPrice = Math.max(...prices.map((el) => Number(el)))
      str = str ? `${str}&priceFrom=${minPrice}&priceTo=${maxPrice}` : `?priceFrom=${minPrice}&priceTo=${maxPrice}`
    }

    if (carBodyType.length) {
      str = str ? `${str}&carBodyType=${carBodyType.join(';')}` : `?carBodyType=${carBodyType.join(';')}`
    }

    if (fuelType.length) {
      str = str ? `${str}&fuelType=${fuelType.join(';')}` : `?fuelType=${fuelType.join(';')}`
    }

    if (driveType.length) {
      str = str ? `${str}&driveType=${driveType.join(';')}` : `?driveType=${driveType.join(';')}`
    }

    router.replace(`/catalog${str}`)
  }

  useEffect(() => {
    loadAdvertisements()
  }, [])

  const loadAdvertisements = async () => {
    try {
      const { payload: bestsellers }: { payload: any } = await dispatch(getBestsellers())
      const { payload: newAdvertisements }: { payload: any } = await dispatch(getNewAdvertisements())

      setBestsellers(bestsellers[0])
      setNewParts(newAdvertisements[0])
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className={styles.dashboard}>
      <div className={styles.dashboard__main_screen}>
        <div className={styles.dashboard__main_screen_container}>
          <div className={styles.dashboard__main_screen_content}>
            <h1>Продавай та купуй автомобіль вигідно</h1>
            <p>
              Подайте заявку на купівлю автомобіля вперше або оберіть нову модель для заміни. Легко пройдіть весь процес
              покупки автомобіля разом із нашим сервісом.
            </p>

            <Link href="/catalog" className={`${styles.dashboard__main_screen_link} ${darkModeClass}`}>
              Повний каталог
            </Link>
          </div>
        </div>
      </div>

      <div className={`container ${styles.dashboard__filter}`}>
        <h2
          className={`${styles.dashboard__filter__title} ${mode === 'dark' ? `${styles.dark_mode}` : ''}`}
          style={{ fontWeight: 700, fontSize: '36px', textAlign: 'center' }}
        >
          Ознайомтеся з понад 1,000 автомобілями на нашому сайті.
        </h2>

        <input
          value={search}
          placeholder="Що шукаєте?"
          onChange={(e) => setSearch(e.target.value)}
          className={`${styles.dashboard__filter_search} ${darkModeClass}`}
        />

        <h4>Пошук по фільтрам:</h4>

        <div>
          {(Object.keys(popularFilters) as FilterKeys[]).map((filter: FilterKeys) => {
            const isSelected = selectedFilters.find((el) => el === popularFilters[filter])

            return (
              <div
                key={filter}
                onClick={() => handleChangeFilters(popularFilters[filter])}
                className={`${styles.dashboard__filter_bage} ${isSelected ? styles.selected : ''}`}
              >
                {filter}
              </div>
            )
          })}
        </div>

        <button
          onClick={onFilterAdvertisements}
          disabled={!selectedFilters.length && !search}
          style={{ boxShadow: 'none', background: '#000', color: '#fff', marginTop: '50px', marginRight: '16px' }}
          className={`${authStyles.switch__button} ${authStyles.button} ${authStyles.switch__btn} ${styles.dashboard__button} ${darkModeClass}`}
        >
          Пошук
        </button>

        <Link href="/catalog" className={styles.dashboard__filter_link}>
          Або переглянути повний каталог{' '}
          <span style={{ fontSize: '26px', position: 'relative', top: '2px' }}>&#x203A;</span>
        </Link>
      </div>

      <div className={`container ${styles.dashboard__container}`}>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`} style={{ marginTop: '100px' }}>
          Наші партнери
        </h2>

        <div className={styles.dashboard__brands} style={{ marginBottom: '100px' }}>
          <BrandsSlider />
        </div>

        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Популярні оголошення</h3>
          <DashboardSlider items={bestsellers} goToPartPage />
        </div>

        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Нові оголошення</h3>
          <DashboardSlider items={newParts} goToPartPage />
        </div>

        <div className={styles.dashboard__about}>
          <h3
            style={{ textAlign: 'center' }}
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            Про компанію
          </h3>
          <p
            style={{ textAlign: 'center', margin: '0 auto', fontSize: '20px', lineHeight: '1.3' }}
            className={`${styles.dashboard__about__text} ${darkModeClass}`}
          >
            Наш сайт пропонує широкий вибір автомобілів різних марок і моделей для покупки. Ми допомагаємо вам легко та
            зручно підібрати автомобіль, виходячи з ваших уподобань та бюджету. Вся інформація про транспортні засоби
            представлена з детальними описами та характеристиками, що дозволить вам зробити обґрунтований вибір. Ми
            також надаємо підтримку на всіх етапах покупки: від вибору автомобіля до його доставки у ваше місто. Наші
            спеціалісти завжди готові відповісти на будь-які питання, пов'язані з експлуатацією та обслуговуванням
            автомобілів. Доставка автомобілів здійснюється в будь-який населений пункт.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
