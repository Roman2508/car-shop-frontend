import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import debounse from 'lodash/debounce'

import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import styles from '@/styles/catalog/index.module.scss'

import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import { ParsedUrlQuery } from 'querystring'
import { useAppDispatch } from '@/redux/store'
import { IQueryParams } from '@/types/catalog'
import { AnimatePresence } from 'framer-motion'
import { IFilter } from '@/redux/filter/FilterTypes'
import { themeSelector } from '@/redux/theme/themeSlice'
import Empty from '@/components/elements/EmptySvg/EmptySvg'
import { correctFilterKeys } from '@/constans/correctFilterKeys'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import { advertisementsSelector } from '@/redux/advertisements/advertisementsSlice'
import { getAdvertisements } from '@/redux/advertisements/advertisementsAsyncActions'
import { clearFilters, filtersSelector, setFilter } from '@/redux/filter/filterSlice'
import SelectedFilterItems from '@/components/modules/CatalogPage/SelectedFilterItems'
import getFilterKey, { FilterValuesType, getFilterKeyByValue } from '@/utils/getFilterKey'
import { RangeFilterBlockItem } from '@/components/modules/CatalogPage/RangeFilterBlockItem'

export const MIN_PRICE = 0
export const MAX_PRICE = 10000000

const MIN_MILEAGE = 0
const MAX_MILEAGE = 1000
const MIN_YEAR_OF_RELEASE = 1900
const MAX_YEAR_OF_RELEASE = new Date().getFullYear()

export const ITEMS_PER_PAGE = 20

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { filters } = useSelector(filtersSelector)
  const { advertisements } = useSelector(advertisementsSelector)

  const { mode } = useSelector(themeSelector)

  const [spinner, setSpinner] = useState(true)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [openMobileFilters, setOpenMobileFilters] = React.useState(false)

  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE])
  const [mileageRange, setMileageRange] = useState<[number, number]>([MIN_MILEAGE, MAX_MILEAGE])
  const [yearOfReleaseRange, setYearOfReleaseRange] = useState<[number, number]>([
    MIN_YEAR_OF_RELEASE,
    MAX_YEAR_OF_RELEASE,
  ])

  const [pagesCount, setPagesCount] = React.useState(
    Math.ceil((advertisements ? advertisements.length : 1) / ITEMS_PER_PAGE)
  )

  const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0

  const [currentPage, setCurrentPage] = useState(isValidOffset ? +query.offset - 1 : 0)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

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

  const debouncedGetResponce = React.useCallback(
    debounse(async (query: ParsedUrlQuery) => {
      const { payload } = await dispatch(getAdvertisements(query))
      const data = payload as [AdvertisementType[], number]

      if (data) {
        setPagesCount(data[1] / ITEMS_PER_PAGE)
      } else {
        setPagesCount(0)
      }
    }, 1000),
    []
  )

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const offset = selected * ITEMS_PER_PAGE
      router.push({ query: { ...router.query, offset, limit: ITEMS_PER_PAGE } }, undefined, { shallow: true })
      setCurrentPage(selected)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    setSelectedFilters([])
    setSpinner(true)
    setCurrentPage(0)
    await dispatch(getAdvertisements(router.query))
    setPriceRange([MIN_PRICE, MAX_PRICE])
    setMileageRange([MIN_MILEAGE, MAX_MILEAGE])
    setYearOfReleaseRange([MIN_YEAR_OF_RELEASE, MAX_YEAR_OF_RELEASE])
    router.replace({ query: { offset: 0, limit: ITEMS_PER_PAGE } }, undefined, { shallow: true })
    setSpinner(false)
    dispatch(clearFilters())
  }

  const isDisabledClearFilterButton = () => {
    const queryCopy = Object.keys(JSON.parse(JSON.stringify(router.query)))
    const activeFilters = queryCopy.filter((el) => el !== 'offset' && el !== 'limit')
    return !activeFilters.length
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
    if (!router.query.offset) {
      // router.push({ query: { ...query, offset: 0, limit: ITEMS_PER_PAGE } }, undefined, { shallow: true })
    }
    debouncedGetResponce({ ...router.query, offset: String(0), limit: String(ITEMS_PER_PAGE) })
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

      if (!router.query.offset) {
        router.push({ query: { ...query, offset: 0, limit: ITEMS_PER_PAGE } }, undefined, { shallow: true })
      }

      const { payload } = await dispatch(getAdvertisements(router.query))
      const data = payload as [AdvertisementType[], number]

      if (data) {
        setPagesCount(data[1] / ITEMS_PER_PAGE)
      } else {
        setPagesCount(0)
      }

      setIsFirstRender(false)
      setSpinner(false)
    }

    fetchData()
  }, [router.query])

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог товарів</h2>
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
                  delete query.yearOfReleaseStart
                  delete query.yearOfReleaseEnd
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
              disabled={isDisabledClearFilterButton()}
              // disabled={!selectedFilters.length || !Object.keys(router.query).length}
              onClick={resetFilters}
            >
              Скинути фільтр
            </button>

            <button
              className={styles.catalog__top__mobile_btn}
              onClick={() => {
                setOpenMobileFilters(true)
                document.querySelector('.body')?.classList.add('overflow-hidden')
              }}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>Фильтр</span>
            </button>

            <FilterSelect setSpinner={setSpinner} setCurrentPage={setCurrentPage} />
          </div>
        </div>

        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              resetFilters={resetFilters}
              mileageRange={mileageRange}
              setMileageRange={setMileageRange}
              filtersMobileOpen={openMobileFilters}
              yearOfReleaseRange={yearOfReleaseRange}
              setYearOfReleaseRange={setYearOfReleaseRange}
              closePopup={() => setOpenMobileFilters(false)}
              resetFilterBtnDisabled={false}
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
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            previousClassName={styles.catalog__bottom__list__prev}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
