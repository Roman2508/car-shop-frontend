import Select from 'react-select'
import { useStore } from 'effector-react'
import React, { CSSProperties } from 'react'
import { FieldErrors } from 'react-hook-form'

import { $mode } from '@/context/mode'
import { optionStyles } from '@/styles/searchInput'
import inputStyles from '@/styles/inputs/index.module.scss'
import { ICreateAdFields } from '@/redux/advertisements/advertisementsTypes'
import { controlStyles, menuStyles, selectStyles } from '@/styles/catalog/select'

interface ISelectInputProps {
  errors: FieldErrors<ICreateAdFields>
  label?: string
  required?: boolean
  styles?: CSSProperties
  options?: { label: string; value: string }[]
  placeholder?: string
  [restProps: string]: any
}

const SelectInput: React.FC<ISelectInputProps> = React.forwardRef((props) => {
  const { errors, options = [], label, required = false, styles = {}, placeholder = '', ...restProps } = props

  const mode = useStore($mode)

  const fieldName = restProps.name as keyof ICreateAdFields

  return (
    <div style={styles}>
      {label && (
        <p style={errors && errors[fieldName]?.ref?.name ? { color: 'red' } : {}}>
          {label}
          {required && '*'}
        </p>
      )}

      <Select
        {...restProps}
        // required={required}
        placeholder={placeholder}
        //
        //   value={categoryOption || createSelectOption('Спочатку дешеві')}
        //   onChange={handleSortOptionChange}
        styles={{
          ...selectStyles,
          container: (defaultStyles) => ({
            ...defaultStyles,
            display: 'inline-block',
          }),
          control: (defaultStyles, state) => ({
            ...controlStyles(defaultStyles, mode),
            border: errors && errors[fieldName]?.ref?.name ? '1px solid red' : '',
            '&:hover': {
              border: errors && errors[fieldName]?.ref?.name ? '1px solid red' : '',
            },
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
          multiValueLabel: (defaultStyles) => ({
            ...defaultStyles,
          }),
        }}
        isSearchable={false}
        options={options}
      />
      <br />
      {errors[fieldName] && <span className={inputStyles.error_alert}>{errors[fieldName]?.message}</span>}
    </div>
  )
})

export default SelectInput
