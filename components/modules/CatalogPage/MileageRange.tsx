import React from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'
import { Range, getTrackBackground } from 'react-range'

import { $mode } from '@/context/mode'
import { IPriceRangeProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const STEP = 1
const MIN = 0
const MAX = 1000000

interface IMileageRangeProps {
  mileageRange: [number, number]
  setMileageRange: React.Dispatch<React.SetStateAction<[number, number]>>
}

const MileageRange: React.FC<IMileageRangeProps> = ({ mileageRange, setMileageRange }) => {
  const router = useRouter()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const updateRoteParam = (mileageFrom: string, mileageTo: string) =>
    router.push(
      {
        query: {
          ...router.query,
          mileageFrom,
          mileageTo,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleMileageRangeChange = (_values: number[]) => {
    const values = _values as [number, number]
    setMileageRange(values)
    updateRoteParam(String(values[0]), String(values[1]))
  }

  const handleChangeValue = (type: 'mileageFrom' | 'mileageTo', value: number) => {
    if (type === 'mileageFrom') {
      if (value < MIN) return
      // @ts-ignore
      setMileageRange((prev: number[]) => {
        updateRoteParam(String(value), String(prev[1]))
        return [value, prev[1]]
      })
    }
    if (type === 'mileageTo') {
      if (value > MAX) return
      // @ts-ignore
      setMileageRange((prev: number[]) => {
        updateRoteParam(String(prev[0]), String(value))
        return [prev[0], value]
      })
    }
  }

  React.useEffect(() => {
    setMileageRange([MIN, MAX])
  }, [])

  return (
    <div className={styles.filters__price}>
      <div className={`${styles.filters__price__inputs} ${darkModeClass}`}>
        <input
          type="number"
          value={Math.ceil(mileageRange[0])}
          onChange={(e) => handleChangeValue('mileageFrom', Number(e.target.value))}
          placeholder={`від ${MIN}`}
        />

        <span className={styles.filters__price__inputs__border} />

        <input
          type="number"
          value={Math.ceil(mileageRange[1])}
          onChange={(e) => handleChangeValue('mileageTo', Number(e.target.value))}
          placeholder={`до ${MAX}`}
        />
      </div>

      <Range
        values={mileageRange}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handleMileageRangeChange}
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
                  values: mileageRange,
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

export default MileageRange
