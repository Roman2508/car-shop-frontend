import Link from 'next/link'
import { toast } from 'sonner'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { IBoilerParts } from '@/types/boilerparts'
import { $shoppingCart } from '@/context/shopping-cart'
import authStyles from '@/styles/auth/index.module.scss'
import styles from '@/styles/dashboard/index.module.scss'
import { getBestsellersOrNewPartsFx } from '@/app/api/boilerParts'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'

export const boilers: IBoilerParts = {
  count: 10,
  rows: [
    {
      id: 1,
      boiler_manufacturer: 'Bosch',
      price: 299.99,
      parts_manufacturer: 'Siemens',
      vendor_code: 'BOS-001',
      name: 'Heat Exchanger',
      description: 'High-efficiency heat exchanger for Bosch boilers.',
      images: JSON.stringify([
        'https://el.kz/storage/storage/element/2023/12/04/mainphoto/79454/1200xauto_KLC4GWu2jz6bzzQMIyUkCySKs6nDBsKzZX8A6uP1.jpg',
      ]),
      in_stock: 50,
      bestseller: true,
      new: false,
      popularity: 85,
      compatibility: 'Bosch Series 5000',
    },
    {
      id: 2,
      boiler_manufacturer: 'Vaillant',
      price: 179.49,
      parts_manufacturer: 'Honeywell',
      vendor_code: 'VAL-002',
      name: 'Thermostat',
      description: 'Advanced programmable thermostat for Vaillant boilers.',
      images: JSON.stringify([
        'https://el.kz/storage/storage/element/2023/12/04/mainphoto/79454/1200xauto_KLC4GWu2jz6bzzQMIyUkCySKs6nDBsKzZX8A6uP1.jpg',
      ]),
      in_stock: 120,
      bestseller: true,
      new: true,
      popularity: 95,
      compatibility: 'Vaillant EcoTEC Plus',
    },
    {
      id: 3,
      boiler_manufacturer: 'Viessmann',
      price: 399.99,
      parts_manufacturer: 'Grundfos',
      vendor_code: 'VIE-003',
      name: 'Pump',
      description: 'High-performance pump compatible with Viessmann boilers.',
      images: JSON.stringify([
        'https://el.kz/storage/storage/element/2023/12/04/mainphoto/79454/1200xauto_KLC4GWu2jz6bzzQMIyUkCySKs6nDBsKzZX8A6uP1.jpg',
      ]),
      in_stock: 30,
      bestseller: false,
      new: false,
      popularity: 70,
      compatibility: 'Viessmann Vitodens 200',
    },
    {
      id: 4,
      boiler_manufacturer: 'Baxi',
      price: 249.0,
      parts_manufacturer: 'Danfoss',
      vendor_code: 'BAX-004',
      name: 'Valve',
      description: 'Pressure release valve for Baxi boilers.',
      images: JSON.stringify([
        'https://el.kz/storage/storage/element/2023/12/04/mainphoto/79454/1200xauto_KLC4GWu2jz6bzzQMIyUkCySKs6nDBsKzZX8A6uP1.jpg',
      ]),
      in_stock: 200,
      bestseller: true,
      new: false,
      popularity: 88,
      compatibility: 'Baxi Duo-Tec',
    },
    {
      id: 5,
      boiler_manufacturer: 'Worcester',
      price: 129.99,
      parts_manufacturer: 'Siemens',
      vendor_code: 'WOR-005',
      name: 'Ignition System',
      description: 'Reliable ignition system for Worcester boilers.',
      images: JSON.stringify([
        'https://el.kz/storage/storage/element/2023/12/04/mainphoto/79454/1200xauto_KLC4GWu2jz6bzzQMIyUkCySKs6nDBsKzZX8A6uP1.jpg',
      ]),
      in_stock: 75,
      bestseller: false,
      new: true,
      popularity: 90,
      compatibility: 'Worcester Greenstar 8000',
    },
  ],
}

const popularFilters = [
  'Нові моделі',
  'Старі моделі',
  'Ціна (менше $15,000)',
  'Ціна ($10,000 - $25,000)',
  'Ціна (понад $25,000)',
  'Седан',
  'Кросовер',
  'Позашляховик',
  'Електричний',
  'Гібрид',
  'Дизель',
  'Бензин',
  'Повнопривідний',
  'Передньопривідний',
  'Задньопривідний',
]

const DashboardPage = () => {
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)

  const [spinner, setSpinner] = useState(false)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = useState<IBoilerParts>({} as IBoilerParts)

  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleChangeFilters = (filter: string) => {
    setSelectedFilters((prev) => {
      const isExist = prev.find((el) => el === filter)

      if (isExist) {
        return prev.filter((el) => el !== filter)
      } else {
        return [...prev, filter]
      }
    })
  }

  useEffect(() => {
    loadBoilerParts()
  }, [])

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true)
      return
    }

    setShowAlert(false)
  }, [shoppingCart.length])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewPartsFx('/boiler-parts/bestsellers')
      const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')

      setBestsellers(boilers)
      setNewParts(boilers)
      // setBestsellers(bestsellers)
      // setNewParts(newParts)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const closeAlert = () => setShowAlert(false)

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
          className={`${styles.dashboard__title} ${mode !== 'dark' ? `${styles.dark_mode}` : ''}`}
          style={{ fontWeight: 700, fontSize: '36px', textAlign: 'center' }}
        >
          Ознайомтеся з понад 1,000 автомобілями на нашому сайті.
        </h2>

        <input className={`${styles.dashboard__filter_search} ${darkModeClass}`} placeholder="Що шукаєте?" />

        <h4>Пошук по фільтрам:</h4>

        <div>
          {popularFilters.map((filter) => {
            const isSelected = selectedFilters.find((el) => el === filter)

            return (
              <div
                key={filter}
                onClick={() => handleChangeFilters(filter)}
                className={`${styles.dashboard__filter_bage} ${isSelected ? styles.selected : ''}`}
              >
                {filter}
              </div>
            )
          })}
        </div>

        <button
          disabled={!selectedFilters.length}
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
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${styles.dashboard__alert} ${darkModeClass}`}
            >
              <CartAlert
                count={shoppingCart.reduce((defaultCount, item) => defaultCount + item.count, 0)}
                closeAlert={closeAlert}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className={`${styles.dashboard__title} ${darkModeClass}`} style={{ marginTop: '100px' }}>
          Наші партнери
        </h2>

        <div className={styles.dashboard__brands} style={{ marginBottom: '100px' }}>
          <BrandsSlider />
        </div>

        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Популярні оголошення</h3>
          {/* <h2 className={`${styles.dashboard__title} ${darkModeClass}`} style={{ marginTop: '100px' }}>
            Наші партнери
          </h2> */}
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>

        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Нові оголошення</h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner} />
        </div>

        <div className={styles.dashboard__about}>
          <h3 className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}>
            Про компанію
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
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
