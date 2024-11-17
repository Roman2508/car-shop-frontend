import Select from 'react-select'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useClickAway } from 'react-use'
import { useSelector } from 'react-redux'
import React, { MutableRefObject, useRef, useState } from 'react'

import { useAppDispatch } from '@/redux/store'
import SearchSvg from '../SearchSvg/SearchSvg'
import styles from '@/styles/header/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { IOption, SelectOptionType } from '../../../types/common'
import { removeClassNamesForOverlayAndBody } from '@/utils/common'
import { AdvertisementType } from '@/redux/advertisements/advertisementsTypes'
import { controlStyles, inputStyles, menuStyles, optionStyles } from '@/styles/searchInput'
import { getAdvertisementById, searchAdvertisements } from '@/redux/advertisements/advertisementsAsyncActions'

const SearchInput = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const inputRef = React.useRef(null)

  const [focused, setFocused] = React.useState(false)

  const { mode } = useSelector(themeSelector)
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
  const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = useState({})
  const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState({})
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
  const borderRef = useRef() as MutableRefObject<HTMLSpanElement>
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [inputValue, setInputValue] = useState('')
  const delayCallback = useDebounceCallback(1000)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if (!selectedOption) {
      setSearchOption(null)
      return
    }

    const id = (selectedOption as IOption)?.value as string

    if (id) {
      getPartAndRedirect(Number(id))
    }

    setSearchOption(selectedOption)
    removeClassNamesForOverlayAndBody()
  }

  const handleSearchClick = async () => {
    if (!inputValue) return
    getPartAndRedirect(Number(inputValue))
  }

  const searchPart = async (search: string) => {
    try {
      if (!search) return

      setInputValue(search)

      const { payload } = await dispatch(searchAdvertisements(search))

      const advertisements = payload as [AdvertisementType[], number]
      const names = advertisements[0].map((item) => ({ label: item.title, value: item.id }))

      // @ts-ignore
      setOptions(names)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const getPartAndRedirect = async (id: number) => {
    const { payload } = await dispatch(getAdvertisementById(id))

    const advertisement = payload as AdvertisementType

    if (!advertisement) {
      toast.warning('Товар не найден.')
      return
    }

    router.push(`/catalog/${advertisement.id}`)
  }

  const onSearchInputChange = (text: string) => {
    delayCallback(() => searchPart(text))
  }

  useClickAway(inputRef, () => {
    setFocused(false)
    document.querySelector('.body')?.classList.remove('overflow-hidden')
  })

  return (
    <>
      {focused && (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            height: '100%',
            width: '100%',
            zIndex: 10,
            left: 0,
            top: 0,
          }}
        />
      )}

      <div style={{ zIndex: focused ? 11 : 1 }} className={styles.header__search} ref={inputRef}>
        <div
          className={styles.header__search__inner}
          onClick={() => {
            document.querySelector('.body')?.classList.add('overflow-hidden')
            setFocused(true)
          }}
        >
          <Select
            placeholder="Я шукаю..."
            value={searchOption}
            onChange={handleSearchOptionChange}
            styles={{
              ...inputStyles,
              // @ts-ignore
              container: (defaultStyles) => ({
                ...defaultStyles,
                ...onMenuOpenContainerStyles,
              }),
              // @ts-ignore
              control: (defaultStyles) => ({
                ...controlStyles(defaultStyles, mode),
                backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
                transition: 'none',
                ...onMenuOpenControlStyles,
              }),
              // @ts-ignore
              input: (defaultStyles) => ({
                ...defaultStyles,
                color: mode === 'dark' ? '#f2f2f2' : '#222222',
              }),
              // @ts-ignore
              menu: (defaultStyles) => ({
                ...menuStyles(defaultStyles, mode),
                marginTop: '-1px',
              }),
              // @ts-ignore
              option: (defaultStyles, state) => ({
                ...optionStyles(defaultStyles, state, mode),
              }),
            }}
            isClearable={true}
            openMenuOnClick={false}
            onInputChange={onSearchInputChange}
            options={options}
          />
          <span ref={borderRef} className={styles.header__search__border} />
        </div>
        <button className={`${styles.header__search__btn} ${darkModeClass}`} ref={btnRef} onClick={handleSearchClick}>
          <span className={styles.header__search__btn__span}>
            <SearchSvg />
          </span>
        </button>
      </div>
    </>
  )
}

export default SearchInput
