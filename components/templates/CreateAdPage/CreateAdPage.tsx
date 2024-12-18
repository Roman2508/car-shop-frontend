import React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'

import {
  uploadFile,
  deleteFile,
  updateAdvertisement,
  createAdvertisement,
  getAdvertisementById,
} from '@/redux/advertisements/advertisementsAsyncActions'
import { useAppDispatch } from '@/redux/store'
import { authSelector } from '@/redux/auth/authSlice'
import { themeSelector } from '@/redux/theme/themeSlice'
import styles from '@/styles/create-ad/index.module.scss'
import inputStyles from '@/styles/inputs/index.module.scss'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import Textarea from '@/components/elements/Textarea/Textarea'
import TextInput from '@/components/elements/TextInput/TextInput'
import SelectInput from '@/components/elements/SelectInput/SelectInput'
import { createAdFields, filters } from '@/constans/filter'
import { AdvertisementType, FileType, ICreateAdFields } from '@/redux/advertisements/advertisementsTypes'

const CreateAdPage = ({ query }: { query?: { id: string } }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)

  const { mode } = useSelector(themeSelector)

  const [spinner, setSpinner] = React.useState(false)

  const [checkboxesState, setCheckboxesState] = React.useState(createAdFields)

  const photosRef = React.useRef([])
  const technicalConditionRef = React.useRef(null)

  const [photos, setPhotos] = React.useState<any[]>(Array(6).fill({ id: null, filename: null, url: null }))

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const darkModeInputClass = mode === 'dark' ? `${inputStyles.dark_mode}` : ''

  const {
    watch,
    control,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateAdFields>({ mode: 'onChange' })

  const setCheckboxValue = (groupKey: string, key: string) => {
    // @ts-ignore
    setCheckboxesState((prev) => {
      return prev.map((el) => {
        if (el.label === groupKey) {
          const items = el.items.map((item) => {
            if (item.title === key) {
              return { ...item, checked: !item.checked }
            }

            return item
          })

          return { ...el, items }
        }

        return el
      })
    })
  }

  const onSubmit = async (data: ICreateAdFields) => {
    try {
      if (!auth) return alert('Для того, щоб опублікувати оголошення, спочатку потрібно авторизуватись')

      const isPhotosExist = photos.some((el) => !!el.id)

      if (!isPhotosExist) {
        toast.error('Завантажте хоча б одне фото')
        return
      }

      const technicalCondition = checkboxesState.find((el) => el.label === 'Технічний стан')
      const isSomeChecked = technicalCondition?.items.some((el) => el.checked)

      if (!isSomeChecked) {
        toast.error('Вкажіть інформацію про технічний стан')
        return
      }

      const adDetails = {}

      checkboxesState.forEach((el) => {
        const keys = {
          'Технічний стан': 'technicalCondition',
          Комфорт: 'comfort',
          Мультимедіа: 'multimedia',
          Безпека: 'security',
        }

        const checkedProperties = el.items.filter((el) => el.checked).map((el) => el.title)

        // @ts-ignore
        adDetails[keys[el.label]] = checkedProperties
      })

      const inputValues = {}

      for (const key in data) {
        // @ts-ignore
        if (typeof data[key] === 'object' && data[key]?.value) {
          // @ts-ignore
          inputValues[key] = data[key].value
        } else {
          // @ts-ignore
          inputValues[key] = data[key]
        }
      }

      setSpinner(true)

      const photoIds = photos.map((el) => el.id).filter((el) => el)

      if (query && query.id) {
        const { payload } = await dispatch(
          updateAdvertisement({ ...inputValues, ...adDetails, photos: photoIds, user: auth.id, id: query.id })
        )
        const advertisement = payload as AdvertisementType
        if (advertisement.id) router.replace(`/catalog/${advertisement.id}`)

        //
      } else {
        const { payload } = await dispatch(
          createAdvertisement({ ...inputValues, ...adDetails, photos: photoIds, user: auth.id })
        )
        const advertisement = payload as AdvertisementType
        if (advertisement.id) router.replace(`/catalog/${advertisement.id}`)
      }
    } finally {
      setSpinner(false)
    }
  }

  const removeFile = async (id: number, filename: string) => {
    if (!window.confirm('Ви дійсно хочете видалити фото?')) return

    const { payload } = await dispatch(deleteFile({ fileId: id, filename }))

    if (!payload) {
      toast.error('Помилка видалення фото')
    }

    setPhotos((prev) => {
      return prev.map((el) => {
        if (el.id === id) {
          return { id: null, filename: null, url: null }
        }
        return el
      })
    })
  }

  const handleChangeImage = async (event: Event, slotNumber: number) => {
    const target = event.target as HTMLInputElement
    const file = target.files && target.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      const { payload } = await dispatch(uploadFile({ file: formData }))

      if (!payload) {
        toast.error('Помилка завантаження')
      }

      const imageUrl = URL.createObjectURL(file)

      setPhotos((prev) => {
        if (Number(slotNumber) >= 0) {
          return prev.map((el, index) => {
            if (index === Number(slotNumber)) {
              return { id: (payload as FileType).id, filename: (payload as FileType).filename, url: imageUrl }
            }
            return el
          })
        }
        return prev
      })

      target.value = ''
    }
  }

  const createSelectInitialData = (items: any[]) => {
    return items.map((el) => ({ value: el.title, label: el.title }))
  }

  const handleChangePhotosOrder = (type: 'prev' | 'next', index: number) => {
    setPhotos((prev) => {
      const newPhotos = JSON.parse(JSON.stringify(prev))

      if (type === 'prev') {
        switch (index) {
          case 1:
            newPhotos[0] = prev[1]
            newPhotos[1] = prev[0]
            break

          case 2:
            newPhotos[1] = prev[2]
            newPhotos[2] = prev[1]
            break

          case 3:
            newPhotos[2] = prev[3]
            newPhotos[3] = prev[2]
            break

          case 4:
            newPhotos[3] = prev[4]
            newPhotos[4] = prev[3]
            break

          case 5:
            newPhotos[4] = prev[5]
            newPhotos[5] = prev[4]
            break
        }
      }

      if (type === 'next') {
        switch (index) {
          case 0:
            newPhotos[1] = prev[0]
            newPhotos[0] = prev[1]
            break

          case 1:
            newPhotos[1] = prev[2]
            newPhotos[2] = prev[1]
            break

          case 2:
            newPhotos[2] = prev[3]
            newPhotos[3] = prev[2]
            break

          case 3:
            newPhotos[3] = prev[4]
            newPhotos[4] = prev[3]
            break

          case 4:
            newPhotos[4] = prev[5]
            newPhotos[5] = prev[4]
            break
        }
      }

      return newPhotos
    })
  }

  React.useEffect(() => {
    if (!query || !query.id) return
    const fetchAdData = async () => {
      const { payload } = await dispatch(getAdvertisementById(Number(query.id)))

      if (!payload) {
        toast.error('Не вдалось знайти оголошення')
        router.replace('/catalog')
        return
      }

      const ad = payload as AdvertisementType

      for (const key in ad) {
        const checkboxesKeys = [
          { ru: 'Технічний стан', en: 'technicalCondition' },
          { ru: 'Комфорт', en: 'comfort' },
          { ru: 'Мультимедіа', en: 'multimedia' },
          { ru: 'Безпека', en: 'security' },
        ]

        const currentKeys = checkboxesKeys.find((el) => el.en === key)

        if (currentKeys) {
          // @ts-ignore
          setCheckboxesState((prev) => {
            return prev.map((el) => {
              if (el.label === currentKeys.ru) {
                const items = el.items.map((item) => {
                  // @ts-ignore
                  const a = ad[key].some((el) => el === item.title)

                  if (a) {
                    return { ...item, checked: true }
                  }

                  return item
                })

                return { ...el, items }
              }

              return el
            })
          })
        }

        // @ts-ignore
        setValue(key, ad[key])
      }

      setPhotos((prev) => {
        ad.photos

        return prev.map((el, index) => {
          if (ad.photos[index]) {
            return {
              id: ad.photos[index].id,
              filename: ad.photos[index].filename,
              url: `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/${ad.photos[index].filename}`,
            }
          }

          return el
        })
      })
    }

    fetchAdData()
  }, [query])

  return (
    <section className={styles.dashboard}>
      <form className={`container ${styles.dashboard__container}`} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={`${styles.create__ad__main__title} ${darkModeClass}`} style={{ marginTop: '50px' }}>
          {query && query.id ? 'Оновити оголошення' : 'Створити оголошення'}
        </h1>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <TextInput
            inputName="title"
            minLength={6}
            maxLength={70}
            errors={errors}
            register={register}
            required="Це поле обов'язкове"
            label="Вкажіть назву оголошення"
            darkModeClass={darkModeInputClass}
          />
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <Textarea
            inputName="description"
            label="Опис"
            minLength={30}
            maxLength={700}
            errors={errors}
            register={register}
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
          />
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <TextInput
            label="Ціна"
            type="number"
            errors={errors}
            inputName="price"
            register={register}
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
          />
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Це поле обов'язкове" }}
            render={({ field }) => {
              return (
                <SelectInput
                  {...field}
                  required
                  errors={errors}
                  label="Категорія"
                  options={createSelectInitialData(filters[0].items)}
                  value={query && query.id ? { value: watch('category'), label: watch('category') } : field.value}
                />
              )
            }}
          />

          <Controller
            name="subcategory"
            control={control}
            rules={{ required: "Це поле обов'язкове" }}
            render={({ field }) => {
              return (
                <SelectInput
                  {...field}
                  required
                  errors={errors}
                  label="Виробник"
                  styles={{ marginTop: '32px' }}
                  options={createSelectInitialData(filters[1].items)}
                  value={query && query.id ? { value: watch('subcategory'), label: watch('subcategory') } : field.value}
                />
              )
            }}
          />
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <h4>Фото</h4>
          <p>Перше фото буде на обкладинці оголошення. Перетягніть, щоб змінити порядок фото.</p>

          <div className={styles.create__ad__photos__wrapper}>
            {photos.map((photo, index) => (
              <React.Fragment key={index}>
                {photo.url ? (
                  <div className={styles.create__ad__photo__wrapper}>
                    <img src={photo.url} />
                    <div className={styles.create__ad__photo__inner}>
                      {index !== 0 && (
                        <span
                          className={styles.create__ad__photo__prev}
                          onClick={() => handleChangePhotosOrder('prev', index)}
                        >{`<`}</span>
                      )}

                      <span
                        className={styles.create__ad__photo__remove}
                        onClick={() => removeFile(photo.id, photo.filename)}
                      >
                        Видалити <br />
                        фото
                      </span>

                      {index !== 5 && (
                        <span
                          className={styles.create__ad__photo__next}
                          onClick={() => handleChangePhotosOrder('next', index)}
                        >{`>`}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <label key={index} className={`${styles.create__ad__photo} ${darkModeClass}`}>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      aria-slot-number={index}
                      ref={(e) => {
                        if (e) {
                          // @ts-ignore
                          photosRef.current[index] = e
                        }
                      }}
                      // @ts-ignore
                      onInput={(e) => handleChangeImage(e, index)}
                    />
                    Додати фото
                  </label>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <h4 style={{ marginBottom: '16px' }}>Додаткова інформація</h4>

          <Controller
            name="carType"
            control={control}
            rules={{ required: "Це поле обов'язкове" }}
            render={({ field }) => {
              return (
                <SelectInput
                  {...field}
                  required
                  errors={errors}
                  label="Тип автомобіля"
                  options={createSelectInitialData(filters[2].items)}
                  value={query && query.id ? { value: watch('carType'), label: watch('carType') } : field.value}
                />
              )
            }}
          />

          <TextInput
            type="number"
            label="Пробіг"
            errors={errors}
            inputName="mileage"
            register={register}
            placeholder="тис.км."
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
            cssStyles={{ display: 'inline-block', marginTop: '32px', width: '100%', maxWidth: '340px' }}
          />

          <Controller
            name="сustomsСleared"
            control={control}
            rules={{ required: "Це поле обов'язкове" }}
            render={({ field }) => {
              return (
                <SelectInput
                  {...field}
                  required
                  errors={errors}
                  label="Розмитнена"
                  styles={{ marginTop: '32px' }}
                  options={createSelectInitialData(filters[15].items)}
                  value={
                    query && query.id ? { value: watch('сustomsСleared'), label: watch('сustomsСleared') } : field.value
                  }
                />
              )
            }}
          />

          <TextInput
            type="number"
            errors={errors}
            placeholder="л."
            register={register}
            label="Об'єм двигуна"
            inputName="engineVolume"
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
            cssStyles={{ display: 'inline-block', marginTop: '32px', width: '100%', maxWidth: '340px' }}
          />

          <Controller
            name="theCarWasDrivenFrom"
            control={control}
            render={({ field }) => {
              return (
                <SelectInput
                  {...field}
                  errors={errors}
                  label="Авто пригнано з"
                  styles={{ marginTop: '32px' }}
                  options={createSelectInitialData(filters[16].items)}
                  value={
                    query && query.id
                      ? { value: watch('theCarWasDrivenFrom'), label: watch('theCarWasDrivenFrom') }
                      : field.value
                  }
                />
              )
            }}
          />

          <TextInput
            type="text"
            label="Модель"
            maxLength={30}
            errors={errors}
            inputName="model"
            register={register}
            placeholder="3 серія"
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
            cssStyles={{ display: 'inline-block', marginTop: '32px', width: '100%', maxWidth: '340px' }}
          />

          <br />

          <TextInput
            min={1900}
            type="number"
            minLength={4}
            maxLength={4}
            errors={errors}
            placeholder="2022"
            label="Рік випуску"
            register={register}
            inputName="yearOfRelease"
            required="Це поле обов'язкове"
            darkModeClass={darkModeInputClass}
            cssStyles={{ display: 'inline-block', marginTop: '32px', width: '100%', maxWidth: '340px' }}
          />

          {(
            [
              { label: 'Тип кузова', name: 'carBodyType', isRequired: true },
              { label: 'Кількість місць', name: 'seatsCount', isRequired: false },
              { label: 'Колір', name: 'color', isRequired: true },
              { label: 'Коробка передач', name: 'gearbox', isRequired: true },
              { label: 'Тип приводу', name: 'driveType', isRequired: true },
              { label: 'Тип палива', name: 'fuelType', isRequired: true },
              { label: 'Лакофарбове покриття', name: 'varnishCoating', isRequired: true },
            ] as const
          ).map((el) => (
            <Controller
              key={el.name}
              name={el.name}
              control={control}
              rules={el.isRequired ? { required: "Це поле обов'язкове" } : {}}
              render={({ field }) => {
                const options = filters.find((f) => f.label === el.label)

                return (
                  <SelectInput
                    {...field}
                    errors={errors}
                    label={el.label}
                    required={el.isRequired}
                    styles={{ marginTop: '32px' }}
                    options={createSelectInitialData(options ? options.items : [])}
                    value={query && query.id ? { value: watch(el.name), label: watch(el.name) } : field.value}
                  />
                )
              }}
            />
          ))}
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          {checkboxesState.map((f) => {
            return (
              <div
                key={f.label}
                style={{ marginBottom: '32px' }}
                ref={f.label === 'Технічний стан' ? technicalConditionRef : null}
              >
                <p>
                  {f.label}
                  {f.label === 'Технічний стан' && '*'}
                </p>

                <ul className={styles.checkbox__list}>
                  {f.items.map((el, index) => (
                    <Checkbox
                      title={el.title}
                      checked={el.checked}
                      event={() => {}}
                      id={el.title}
                      key={index}
                      groupKey={f.label}
                      setCheckboxValue={setCheckboxValue}
                    />
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className={`${styles.create__ad__block} ${darkModeClass}`}>
          <button className={styles.button} disabled={spinner} type="submit">
            {spinner ? 'Завантаження...' : query && query.id ? 'Зберегти зміни' : 'Опублікувати'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateAdPage
