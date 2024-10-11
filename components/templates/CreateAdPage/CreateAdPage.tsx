import Link from 'next/link'
import { toast } from 'react-toastify'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { IBoilerParts } from '@/types/boilerparts'
import { $shoppingCart } from '@/context/shopping-cart'
import authStyles from '@/styles/auth/index.module.scss'
import styles from '@/styles/create-ad/index.module.scss'
import inputStyles from '@/styles/inputs/index.module.scss'
import { getBestsellersOrNewPartsFx } from '@/app/api/boilerParts'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import NameInput from '@/components/elements/AuthPage/NameInput'
import TextInput from '@/components/elements/TextInput/TextInput'
import Textarea from '@/components/elements/Textarea/Textarea'
import SelectInput from '@/components/elements/SelectInput/SelectInput'

const CreateAdPage = () => {
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)

  const [spinner, setSpinner] = useState(false)
  const [showAlert, setShowAlert] = useState(!!shoppingCart.length)
  const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts)
  const [bestsellers, setBestsellers] = useState<IBoilerParts>({} as IBoilerParts)

  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const darkModeInputClass = mode === 'dark' ? `${inputStyles.dark_mode}` : ''

  useEffect(() => {
    if (shoppingCart.length) {
      setShowAlert(true)
      return
    }

    setShowAlert(false)
  }, [shoppingCart.length])

  const closeAlert = () => setShowAlert(false)

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <h1 className={`${styles.create__ad__main__title} ${darkModeClass}`} style={{ marginTop: '50px' }}>
          Створити оголошення
        </h1>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <TextInput
            errors={{}}
            minLength={6}
            maxLength={70}
            inputName="title"
            register={() => {}}
            required="Це поле обов'язкове"
            label="Вкажіть назву оголошення"
            darkModeClass={darkModeInputClass}
          />
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <Textarea
            errors={{}}
            label="Опис"
            minLength={30}
            maxLength={700}
            register={() => {}}
            inputName="description"
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
          />
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <TextInput
            errors={{}}
            label="Ціна"
            type="number"
            minLength={6}
            maxLength={70}
            inputName="title"
            register={() => {}}
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
          />
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <h4>Фото</h4>
          <p>Перше фото буде на обкладинці оголошення. Перетягніть, щоб змінити порядок фото.</p>

          <div className={styles.create__ad__photos__wrapper}>
            {Array(6)
              .fill(null)
              .map((el, index) => (
                <div className={styles.create__ad__photo} key={index}>
                  Додати фото
                </div>
              ))}
          </div>
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <h4 style={{ marginBottom: '16px' }}>Додаткова інформація</h4>

          <SelectInput label="Тип автомобіля" />

          <TextInput
            errors={{}}
            type="number"
            label="Пробіг"
            placeholder="тис.км."
            minLength={6}
            maxLength={70}
            inputName="title"
            register={() => {}}
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
            cssStyles={{ display: 'inline-block', marginTop: '32px', width: '100%', maxWidth: '340px' }}
          />

          <p style={{ marginTop: '32px' }}>Умови продажу*</p>
          
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>1</div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>1</div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>1</div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>1</div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>1</div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>1</div>
      </div>
    </section>
  )
}

export default CreateAdPage
