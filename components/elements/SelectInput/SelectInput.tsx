import React from 'react'
import Select from 'react-select'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { optionStyles } from '@/styles/searchInput'
import { controlStyles, menuStyles, selectStyles } from '@/styles/catalog/select'

interface ISelectInputProps {
  label?: string
  options?: { label: string; value: string }[]
}

const SelectInput: React.FC<ISelectInputProps> = (props) => {
  const {
    options = [
      { value: '', label: '111213 111213 111213 111213 111213 111213 111213 111213 ' },
      { value: '12', label: '12' },
    ],
    label,
  } = props

  const mode = useStore($mode)

  return (
    <div>
      {label && <p>{label}</p>}

      <Select
        placeholder="Я шукаю.."
        //   value={categoryOption || createSelectOption('Спочатку дешеві')}
        //   onChange={handleSortOptionChange}
        styles={{
          ...selectStyles,
          container: (defaultStyles) => ({
            ...defaultStyles,
            display: 'inline-block',
          }),
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
        options={options}
      />
    </div>
  )
}

export default SelectInput
