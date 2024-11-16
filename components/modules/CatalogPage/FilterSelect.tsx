/* eslint-disable indent */
import { useState } from 'react'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { optionStyles } from '@/styles/searchInput'
import { createSelectOption } from '@/utils/common'
import { themeSelector } from '@/redux/theme/themeSlice'
import { IOption, SelectOptionType } from '@/types/common'
import { categoriesOptions } from '@/utils/selectContents'
import { controlStyles, menuStyles, selectStyles } from '@/styles/catalog/select'

interface IFilterSelectProps {
  setSpinner: (arg0: boolean) => void
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const FilterSelect: React.FC<IFilterSelectProps> = ({ setSpinner, setCurrentPage }) => {
  const router = useRouter()

  const { mode } = useSelector(themeSelector)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)

  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          offset: 0,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)
    setCurrentPage(0)

    switch ((selectedOption as IOption).value) {
      case 'Спочатку дешеві':
        updateRoteParam('cheap')
        break
      case 'Спочатку дорогі':
        updateRoteParam('expensive')
        break
      case 'Спочатку нові':
        updateRoteParam('new')
        break
      case 'Спочатку старі':
        updateRoteParam('old')
        break
    }

    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <>
      <Select
        placeholder="Я шукаю.."
        value={categoryOption || createSelectOption('Спочатку дешеві')}
        onChange={handleSortOptionChange}
        styles={{
          ...selectStyles,
          /* @ts-ignore */
          control: (defaultStyles) => ({
            ...controlStyles(defaultStyles, mode),
          }),
          /* @ts-ignore */
          input: (defaultStyles) => ({
            ...defaultStyles,
            color: mode === 'dark' ? '#f2f2f2' : '#222222',
          }),
          /* @ts-ignore */
          menu: (defaultStyles) => ({
            ...menuStyles(defaultStyles, mode),
          }),
          /* @ts-ignore */
          option: (defaultStyles, state) => ({
            ...optionStyles(defaultStyles, state, mode),
          }),
        }}
        isSearchable={false}
        options={categoriesOptions}
      />
    </>
  )
}

export default FilterSelect
