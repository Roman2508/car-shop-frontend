import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'

interface ICatalogFilterProps {
  priceRange: [number, number]
  mileageRange: [number, number]
  yearOfReleaseRange: [number, number]
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
  setMileageRange: React.Dispatch<React.SetStateAction<[number, number]>>
  setYearOfReleaseRange: React.Dispatch<React.SetStateAction<[number, number]>>

  filtersMobileOpen: boolean
  closePopup: VoidFunction
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
}

const CatalogFilters: React.FC<ICatalogFilterProps> = ({
  priceRange,
  setPriceRange,
  mileageRange,
  setMileageRange,
  yearOfReleaseRange,
  setYearOfReleaseRange,
  // setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  // isPriceRangeChanged,
  // currentPage,
  // setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}) => {
  const isMobile = useMediaQuery(820)

  return (
    <>
      {isMobile ? (
        <>
          <CatalogFiltersMobile
            priceRange={priceRange}
            closePopup={closePopup}
            mileageRange={mileageRange}
            resetFilters={resetFilters}
            setPriceRange={setPriceRange}
            setMileageRange={setMileageRange}
            filtersMobileOpen={filtersMobileOpen}
            yearOfReleaseRange={yearOfReleaseRange}
            setYearOfReleaseRange={setYearOfReleaseRange}
            resetFilterBtnDisabled={resetFilterBtnDisabled}
          />
        </>
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          mileageRange={mileageRange}
          setMileageRange={setMileageRange}
          yearOfReleaseRange={yearOfReleaseRange}
          setYearOfReleaseRange={setYearOfReleaseRange}
        />
      )}
    </>
  )
}

export default CatalogFilters
