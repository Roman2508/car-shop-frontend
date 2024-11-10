import Select from 'react-select'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useClickAway } from 'react-use'
import { useStore } from 'effector-react'
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
import { NoOptionsMessage, NoOptionsSpinner } from '../SelectOptionsMessage/SelectOptionsMessage'
import { getAdvertisementById, searchAdvertisements } from '@/redux/advertisements/advertisementsAsyncActions'

const SearchInput = () => {
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
  const router = useRouter()

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

  const onFocusSearch = () => {
    // toggleClassNamesForOverlayAndBody('open-search')
    // setSearchInputZIndex(100)
  }

  const handleSearchClick = async () => {
    if (!inputValue) return
    getPartAndRedirect(Number(inputValue))
  }

  const searchPart = async (search: string) => {
    try {
      if (!search) return

      setInputValue(search)

      // const data = await searchPartsFx({
      //   url: '/boiler-parts/search',
      //   search,
      // })

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
    // const part = await getPartByNameFx({
    //   url: '/boiler-parts/name',
    //   name,
    // })

    const { payload } = await dispatch(getAdvertisementById(id))

    const advertisement = payload as AdvertisementType

    if (!advertisement) {
      toast.warning('Товар не найден.')
      return
    }

    router.push(`/catalog/${advertisement.id}`)
  }

  const onSearchInputChange = (text: string) => {
    // document.querySelector('.overlay')?.classList.add('open-search')
    // document.querySelector('.body')?.classList.add('overflow-hidden')

    delayCallback(() => searchPart(text))
  }

  const onSearchMenuOpen = () => {
    // setOnMenuOpenControlStyles({
    //   borderBottomLeftRadius: 0,
    //   border: 'none',
    // })
    // setOnMenuOpenContainerStyles({
    //   boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    // })
    // btnRef.current.style.border = 'none'
    // btnRef.current.style.borderBottomRightRadius = '0'
    // borderRef.current.style.display = 'block'
  }

  const onSearchMenuClose = () => {
    // setOnMenuOpenControlStyles({
    //   borderBottomLeftRadius: 4,
    //   boxShadow: 'none',
    //   border: '1px solid #9e9e9e',
    // })
    // setOnMenuOpenContainerStyles({
    //   boxShadow: 'none',
    // })
    // btnRef.current.style.border = '1px solid #9e9e9e'
    // btnRef.current.style.borderLeft = 'none'
    // btnRef.current.style.borderBottomRightRadius = '4px'
    // borderRef.current.style.display = 'none'
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
            // components={{
            //   NoOptionsMessage: spinner ? NoOptionsSpinner : NoOptionsMessage,
            // }}
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
            onFocus={onFocusSearch}
            onMenuOpen={onSearchMenuOpen}
            onMenuClose={onSearchMenuClose}
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
