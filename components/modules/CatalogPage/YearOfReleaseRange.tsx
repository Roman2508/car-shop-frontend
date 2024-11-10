import React from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { Range, getTrackBackground } from 'react-range'

import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'

const STEP = 1
const MIN = 1900
const MAX = new Date().getFullYear()

interface IYearOfReleaseRangeProps {
  yearOfReleaseRange: [number, number]
  setYearOfReleaseRange: React.Dispatch<React.SetStateAction<[number, number]>>
}

const YearOfReleaseRange: React.FC<IYearOfReleaseRangeProps> = ({ yearOfReleaseRange, setYearOfReleaseRange }) => {
  const router = useRouter()

  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const updateRoteParam = (yearOfReleaseStart: string, yearOfReleaseEnd: string) =>
    router.push(
      {
        query: {
          ...router.query,
          yearOfReleaseStart,
          yearOfReleaseEnd,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleYearOfReleaseRangeChange = (_values: number[]) => {
    const values = _values as [number, number]
    setYearOfReleaseRange(values)
    updateRoteParam(String(values[0]), String(values[1]))
  }

  const handleChangeValue = (type: 'yearOfReleaseStart' | 'yearOfReleaseEnd', value: number) => {
    if (type === 'yearOfReleaseStart') {
      if (value < MIN) return
      // @ts-ignore
      setYearOfReleaseRange((prev: number[]) => {
        updateRoteParam(String(value), String(prev[1]))
        return [value, prev[1]]
      })
    }
    if (type === 'yearOfReleaseEnd') {
      if (value > MAX) return
      // @ts-ignore
      setYearOfReleaseRange((prev: number[]) => {
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
          value={Math.ceil(yearOfReleaseRange[0])}
          onChange={(e) => handleChangeValue('yearOfReleaseStart', Number(e.target.value))}
          placeholder={`від ${MIN}`}
        />

        <span className={styles.filters__price__inputs__border} />

        <input
          type="number"
          value={Math.ceil(yearOfReleaseRange[1])}
          onChange={(e) => handleChangeValue('yearOfReleaseEnd', Number(e.target.value))}
          placeholder={`до ${MAX}`}
        />
      </div>

      <Range
        values={yearOfReleaseRange}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handleYearOfReleaseRangeChange}
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
                  values: yearOfReleaseRange,
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

export default YearOfReleaseRange
