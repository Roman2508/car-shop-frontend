import React from 'react'
import Link from 'next/link'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/ProfileForm/index.module.scss'
import advStyles from '@/styles/dashboard/index.module.scss'
import catalogStyles from '@/styles/catalog/index.module.scss'
import { usePopup } from '@/hooks/usePoup'
import FilterSelect from '../CatalogPage/FilterSelect'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'
import { useAppDispatch } from '@/redux/store'
import { getNotAccepted } from '@/redux/advertisements/advertisementsAsyncActions'
import { advertisementsSelector, clearAdvertisements } from '@/redux/advertisements/advertisementsSlice'
import { useSelector } from 'react-redux'
import CatalogItem from '../CatalogPage/CatalogItem'
import { useRouter } from 'next/router'
import { authSelector } from '@/redux/auth/authSlice'

export const boilers = {
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

const Administration = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const { auth } = useSelector(authSelector)
  const { advertisements } = useSelector(advertisementsSelector)

  const isMedia768 = useMediaQuery(768)
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const width = { width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344 }

  const { toggleOpen, open, closePopup } = usePopup()

  const [spinner, setSpinner] = React.useState(false)

  React.useEffect(() => {
    const isAdmin = auth?.role === 'ADMIN' || auth?.role === 'SUPER_ADMIN'
    if (!isAdmin) {
      router.replace('/profile')
      return
    }

    dispatch(getNotAccepted())

    return () => {
      dispatch(clearAdvertisements())
    }
  }, [])

  return (
    <div className={styles.administration}>
      <div className={`${styles.administration__filter} ${darkModeClass}`}>
        <div className={catalogStyles.catalog__top__inner}>
          <div></div>

          <button className={catalogStyles.catalog__top__mobile_btn} onClick={toggleOpen}>
            <span className={catalogStyles.catalog__top__mobile_btn__svg}>
              <FilterSvg />
            </span>
            <span className={styles.catalog__top__mobile_btn__text}>Фильтр</span>
          </button>
          <FilterSelect setSpinner={setSpinner} />
        </div>
      </div>

      {advertisements ? (
        <div className={catalogStyles.catalog__list}>
          {advertisements.map((item) => (
            <CatalogItem item={item} key={item.id} self />
          ))}
        </div>
      ) : (
        <h2
          style={
            darkModeClass
              ? { color: '#fff', fontWeight: 500, width: '100%', textAlign: 'center', padding: '40px 0' }
              : { color: '#000', fontWeight: 500, width: '100%', textAlign: 'center', padding: '40px 0' }
          }
        >
          Немає нових оголошень
        </h2>
      )}
    </div>
  )
}

export default Administration
