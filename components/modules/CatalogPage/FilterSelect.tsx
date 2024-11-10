/* eslint-disable indent */
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { controlStyles, menuStyles, selectStyles } from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '@/utils/selectContents'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { themeSelector } from '@/redux/theme/themeSlice'

const FilterSelect = ({ setSpinner }: { setSpinner: (arg0: boolean) => void }) => {
  const router = useRouter()

  const { mode } = useSelector(themeSelector)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)

  // useEffect(() => {
  //   if (boilerParts.rows) {
  //     switch (router.query.first) {
  //       case 'cheap':
  //         updateCategoryOption('Спочатку дешеві')
  //         setBoilerPartsCheapFirst()
  //         break
  //       case 'expensive':
  //         updateCategoryOption('Спочатку дорогі')
  //         setBoilerPartsExpensiveFirst()
  //         break
  //       case 'new':
  //         updateCategoryOption('Спочатку нові')
  //         setBoilerPartsExpensiveFirst()
  //         break
  //       case 'old':
  //         updateCategoryOption('Спочатку старі')
  //         setBoilerPartsExpensiveFirst()
  //         break
  //     }
  //   }
  // }, [boilerParts.rows, router.query.first])

  // const updateCategoryOption = (value: string) => setCategoryOption({ value, label: value })

  // const updateRoteParam = (first: string) =>
  //   router.push(
  //     {
  //       query: {
  //         ...router.query,
  //         first,
  //       },
  //     },
  //     undefined,
  //     { shallow: true }
  //   )

  // const handleSortOptionChange = (selectedOption: SelectOptionType) => {
  //   setSpinner(true)
  //   setCategoryOption(selectedOption)

  //   switch ((selectedOption as IOption).value) {
  //     case 'Спочатку дешеві':
  //       setBoilerPartsCheapFirst()
  //       updateRoteParam('cheap')
  //       break
  //     case 'Спочатку дорогі':
  //       setBoilerPartsExpensiveFirst()
  //       updateRoteParam('expensive')
  //       break
  //     case 'Спочатку нові':
  //       setBoilerPartsByPopularity()
  //       updateRoteParam('new')
  //       break
  //     case 'Спочатку старі':
  //       setBoilerPartsByPopularity()
  //       updateRoteParam('old')
  //       break
  //   }

  //   setTimeout(() => setSpinner(false), 1000)
  // }

  return (
    <>
      {/* <Select
      placeholder="Я шукаю.."
      value={categoryOption || createSelectOption('Спочатку дешеві')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    /> */}
    </>
  )
}

export default FilterSelect
