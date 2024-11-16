import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { Range, getTrackBackground } from 'react-range'

import styles from '@/styles/catalog/index.module.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { themeSelector } from '@/redux/theme/themeSlice'

const STEP = 1000
const MIN = 0
const MAX = 10000000

interface IPriceRangeProps {
  priceRange: [number, number]
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
}

const PriceRange: React.FC<IPriceRangeProps> = ({ priceRange, setPriceRange }) => {
  const router = useRouter()

  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const updateRoteParam = (priceFrom: string, priceTo: string) =>
    router.push(
      {
        query: {
          ...router.query,
          priceFrom,
          priceTo,
        },
      },
      undefined,
      { shallow: true }
    )

  const handlePriceRangeChange = (_values: number[]) => {
    const values = _values as [number, number]
    setPriceRange(values)
    updateRoteParam(String(values[0]), String(values[1]))
  }

  const handleChangeValue = (type: 'priceFrom' | 'priceTo', value: number) => {
    if (type === 'priceFrom') {
      if (value < MIN) return
      // @ts-ignore
      setPriceRange((prev: number[]) => {
        updateRoteParam(String(value), String(prev[1]))
        return [value, prev[1]]
      })
    }
    if (type === 'priceTo') {
      if (value > MAX) return
      // @ts-ignore
      setPriceRange((prev: number[]) => {
        updateRoteParam(String(prev[0]), String(value))
        return [prev[0], value]
      })
    }
  }

  return (
    <div className={styles.filters__price}>
      <div className={`${styles.filters__price__inputs} ${darkModeClass}`}>
        <input
          type="number"
          value={Math.ceil(priceRange[0])}
          onChange={(e) => handleChangeValue('priceFrom', Number(e.target.value))}
          placeholder="від 0"
        />

        <span className={styles.filters__price__inputs__border} />

        <input
          type="number"
          value={Math.ceil(priceRange[1])}
          onChange={(e) => handleChangeValue('priceTo', Number(e.target.value))}
          placeholder="до 100 000 000"
        />
      </div>

      <Range
        values={priceRange}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handlePriceRangeChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: 'auto',
              display: 'flex',
              width: '100%',
              padding: '0 10px',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: priceRange,
                  colors: ['#B1CEFA', '#247CC8', '#B1CEFA'],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div {...props} style={{ ...props.style }}>
            <div
              style={{
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '3px solid #1C629E',
                boxShadow: '0px 12px 8px -6px rgba(174, 181, 239, 0.2)',
              }}
            />
          </div>
        )}
      />
    </div>
  )
}

export default PriceRange
