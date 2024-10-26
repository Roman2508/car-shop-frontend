import { getBoilerPartsFx } from '@/app/api/boilerParts'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import debounse from 'lodash/debounce'
import ManufacturersBlock from '@/components/modules/CatalogPage/SelectedFilterItems'
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import { $mode } from '@/context/mode'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IBoilerParts } from '@/types/boilerparts'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopup } from '@/hooks/usePoup'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'
import { getAdvertisements } from '@/redux/advertisements/advertisementsAsyncActions'
import { useAppDispatch } from '@/redux/store'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import { advertisementsSelector, clearAdvertisements } from '@/redux/advertisements/advertisementsSlice'
import { IFilter } from '@/redux/filter/FilterTypes'
import { clearFilters, filtersSelector, setFilter } from '@/redux/filter/filterSlice'
import SelectedFilterItems from '@/components/modules/CatalogPage/SelectedFilterItems'
import getFilterKey, { filterKeys, FilterValuesType, getFilterKeyByValue } from '@/utils/getFilterKey'
import EmptySvg from '@/components/elements/EmptySvg/EmptySvg'
import Empty from '@/components/elements/EmptySvg/EmptySvg'
import { ParsedUrlQuery } from 'querystring'
import { RangeFilterBlockItem } from '@/components/modules/CatalogPage/RangeFilterBlockItem'
import { correctFilterKeys } from '@/constans/correctFilterKeys'

export const MIN_PRICE = 0
export const MAX_PRICE = 10000000
const MIN_MILEAGE = 0
const MAX_MILEAGE = 1000000
const MIN_YEAR_OF_RELEASE = 1900
const MAX_YEAR_OF_RELEASE = new Date().getFullYear()

// todo:
// 1. При створенні оголошення коли користувач завантажив фото і покидає сторінку (не опублікувавши) треба попереджати і видаляти фото
// 2. Розподіл ролей на сторінці profile
// 3. pagination
// 4. повторний вибір фото (reset target.value для input type file)
// 5. 
// 6. 

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { filters } = useSelector(filtersSelector)
  const { advertisements } = useSelector(advertisementsSelector)

  const mode = useStore($mode)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const filteredBoilerParts = useStore($filteredBoilerParts)

  const [spinner, setSpinner] = useState(true)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE])
  const [mileageRange, setMileageRange] = useState<[number, number]>([MIN_MILEAGE, MAX_MILEAGE])
  const [yearOfReleaseRange, setYearOfReleaseRange] = useState<[number, number]>([
    MIN_YEAR_OF_RELEASE,
    MAX_YEAR_OF_RELEASE,
  ])

  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)

  const pagesCount = Math.ceil((advertisements ? advertisements.length : 1) / 20)
  const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(isValidOffset ? +query.offset - 1 : 0)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => item.checked)
  const isAnyPartsManufacturerChecked = partsManufacturers.some((item) => item.checked)

  const resetFilterBtnDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )
  const { toggleOpen, open, closePopup } = usePopup()

  const [selectedFilters, setSelectedFilters] = React.useState<IFilter[]>([])

  const updateRoteParam = (key: string, value: string) =>
    router.replace(
      {
        query: {
          ...router.query,
          [key]: value,
        },
      },
      undefined,
      { shallow: true }
    )

  // useEffect(() => {
  //   loadBoilerParts()
  // }, [filteredBoilerParts, isFilterInQuery])

  // const loadBoilerParts = async () => {
  //   try {
  //     setSpinner(true)
  //     // const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
  //     const { payload } = await dispatch(getAdvertisements(''))
  //     const data = payload as any

  //     if (!isValidOffset) {
  //       router.replace({
  //         query: {
  //           offset: 1,
  //         },
  //       })

  //       resetPagination(data)
  //       return
  //     }

  //     if (isValidOffset) {
  //       if (+query.offset > Math.ceil(data.count / 20)) {
  //         router.push(
  //           {
  //             query: {
  //               ...query,
  //               offset: 1,
  //             },
  //           },
  //           undefined,
  //           { shallow: true }
  //         )

  //         setCurrentPage(0)
  //         // setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)

  //         setBoilerParts(data)
  //         return
  //       }

  //       const offset = +query.offset - 1
  //       const result = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${offset}`)

  //       setCurrentPage(offset)
  //       // setBoilerParts(isFilterInQuery ? filteredBoilerParts : result)

  //       setBoilerParts(data)
  //       return
  //     }

  //     setCurrentPage(0)
  //     // setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)

  //     setBoilerParts(data)
  //   } catch (error) {
  //     toast.error((error as Error).message)
  //   } finally {
  //     setTimeout(() => setSpinner(false), 1000)
  //   }
  // }

  const debouncedGetResponce = React.useCallback(
    debounse((query: ParsedUrlQuery) => dispatch(getAdvertisements(query)), 1000),
    []
  )

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredBoilerParts : data)
        return
      }

      const { isValidBoilerQuery, isValidPartsQuery, isValidPriceQuery } = checkQueryParams(router)

      const result = await getBoilerPartsFx(
        `/boiler-parts?limit=20&offset=${selected}${
          isFilterInQuery && isValidBoilerQuery ? `&boiler=${router.query.boiler}` : ''
        }${isFilterInQuery && isValidPartsQuery ? `&parts=${router.query.parts}` : ''}${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setBoilerParts(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    setSelectedFilters([])
    setSpinner(true)
    await dispatch(getAdvertisements(router.query))
    setSpinner(false)
    dispatch(clearFilters())

    // try {
    //   const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
    //   const params = router.query
    //   delete params.boiler
    //   delete params.parts
    //   delete params.priceFrom
    //   delete params.priceTo
    //   params.first = 'cheap'
    //   router.push({ query: { ...params } }, undefined, { shallow: true })
    //   setBoilerManufacturers(boilerManufacturers.map((item) => ({ ...item, checked: false })))
    //   setPartsManufacturers(partsManufacturers.map((item) => ({ ...item, checked: false })))
    //   setBoilerParts(data)
    //   setPriceRange([1000, 9000])
    //   setIsPriceRangeChanged(false)
    // } catch (error) {
    //   toast.error((error as Error).message)
    // }
  }

  // set filter on first render
  React.useEffect(() => {
    if (Object.keys(router.query).length) {
      for (const key in router.query) {
        const isKeyCorrect = correctFilterKeys.some((el) => el === key)
        if (!isKeyCorrect) break

        if (key === 'priceFrom') {
          setPriceRange((prev) => {
            return [Number(router.query[key]), prev[1]]
          })
        } else if (key === 'priceTo') {
          setPriceRange((prev) => {
            return [prev[0], Number(router.query[key])]
          })
        } else if (key === 'mileageFrom') {
          setMileageRange((prev) => {
            return [Number(router.query[key]), prev[1]]
          })
        } else if (key === 'mileageTo') {
          setMileageRange((prev) => {
            return [prev[0], Number(router.query[key])]
          })
        } else if (key === 'yearOfReleaseStart') {
          setYearOfReleaseRange((prev) => {
            return [Number(router.query[key]), prev[1]]
          })
        } else if (key === 'yearOfReleaseEnd') {
          setYearOfReleaseRange((prev) => {
            return [prev[0], Number(router.query[key])]
          })
        } else {
          const values = router.query[key]

          const checkedItems = (typeof values === 'string' ? values : '').split(';')
          checkedItems.forEach((title: string) => {
            if (title === '' || key === '') return
            const label = getFilterKeyByValue(key as FilterValuesType)
            dispatch(setFilter({ label, title, checked: true }))
          })
        }
      }
    }
  }, [])

  // get checked items
  React.useEffect(() => {
    const filter = filters as IFilter[]
    const selectedFilters = filter.filter((el) => el.items.some((item) => item.checked))
    const selectedItems = selectedFilters.map((el) => ({ ...el, items: el.items.filter((el) => el.checked) }))
    setSelectedFilters(selectedItems)
  }, [filters])

  // set filter data to query params
  React.useEffect(() => {
    selectedFilters.forEach((el) => {
      const value = el.items.map((el) => el.title).join(';')
      updateRoteParam(getFilterKey(el.label), value)
    })

    // if there are no filters
    if (!isFirstRender && !selectedFilters.length) {
      router.push({ query: {} }, undefined, { shallow: true })
    }
  }, [selectedFilters])

  // !first render
  React.useEffect(() => {
    if (isFirstRender) return
    debouncedGetResponce(router.query)
  }, [router.query])

  // first render
  React.useEffect(() => {
    if (!isFirstRender) return

    const fetchData = async () => {
      setSpinner(true)

      for (const key in router.query) {
        const isKeyCorrect = correctFilterKeys.some((el) => el === key)
        if (!isKeyCorrect) {
          const query = router.query
          delete query[key]
          router.push({ query: { ...query } }, undefined, { shallow: true })
        }
      }

      await dispatch(getAdvertisements(router.query))
      setIsFirstRender(false)
      setSpinner(false)
    }

    fetchData()
  }, [router.query])

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог товаров</h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          {(priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE) && (
            <AnimatePresence>
              <RangeFilterBlockItem
                label="Ціна"
                title={`від ${priceRange[0]} до ${priceRange[1]}`}
                onClick={() => {
                  setPriceRange([MIN_PRICE, MAX_PRICE])
                  const query = router.query
                  delete query.priceFrom
                  delete query.priceTo
                  router.push({ query: { ...query } }, undefined, { shallow: true })
                }}
              />
            </AnimatePresence>
          )}

          {(mileageRange[0] !== MIN_MILEAGE || mileageRange[1] !== MAX_MILEAGE) && (
            <AnimatePresence>
              <RangeFilterBlockItem
                label="Пробіг"
                title={`від ${mileageRange[0]} до ${mileageRange[1]}`}
                onClick={() => {
                  setMileageRange([MIN_MILEAGE, MAX_MILEAGE])
                  const query = router.query
                  delete query.mileageFrom
                  delete query.mileageTo
                  router.push({ query: { ...query } }, undefined, { shallow: true })
                }}
              />
            </AnimatePresence>
          )}

          {(yearOfReleaseRange[0] !== MIN_YEAR_OF_RELEASE || yearOfReleaseRange[1] !== MAX_YEAR_OF_RELEASE) && (
            <AnimatePresence>
              <RangeFilterBlockItem
                label="Рік випуску"
                title={`від ${yearOfReleaseRange[0]} до ${yearOfReleaseRange[1]}`}
                onClick={() => {
                  setYearOfReleaseRange([MIN_YEAR_OF_RELEASE, MAX_YEAR_OF_RELEASE])
                  const query = router.query
                  delete query.priceFrom
                  delete query.priceTo
                  router.push({ query: { ...query } }, undefined, { shallow: true })
                }}
              />
            </AnimatePresence>
          )}

          {Boolean(selectedFilters.length) &&
            selectedFilters.map((selectedFilter) => (
              <AnimatePresence>
                {selectedFilter.items.length && (
                  <SelectedFilterItems
                    label={selectedFilter.label}
                    selectedItems={selectedFilter.items}
                    setSelectedFilters={setSelectedFilters}
                  />
                )}
              </AnimatePresence>
            ))}

          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={!selectedFilters.length}
              onClick={resetFilters}
            >
              Скинути фільтр
            </button>
            <button className={styles.catalog__top__mobile_btn} onClick={toggleOpen}>
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>Фильтр</span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>

        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              // closePopup={closePopup}
              // filtersMobileOpen={open}
              // currentPage={currentPage}
              // resetFilters={resetFilters}
              mileageRange={mileageRange}
              setMileageRange={setMileageRange}
              yearOfReleaseRange={yearOfReleaseRange}
              setYearOfReleaseRange={setYearOfReleaseRange}
              // setIsFilterInQuery={setIsFilterInQuery}
              // isPriceRangeChanged={isPriceRangeChanged}
              // resetFilterBtnDisabled={resetFilterBtnDisabled}
              // setIsPriceRangeChanged={setIsPriceRangeChanged}
            />

            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : advertisements && advertisements?.length ? (
              <ul className={styles.catalog__list}>
                {advertisements.map((item) => (
                  <CatalogItem item={item} key={item.id} self />
                ))}
              </ul>
            ) : (
              <Empty darkModeClass={darkModeClass} />
            )}
          </div>

          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
