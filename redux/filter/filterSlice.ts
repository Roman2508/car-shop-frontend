import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { InitialStateType } from './FilterTypes'
import { filters } from '@/constans/filter'
import getFilterKey, { filterKeys } from '@/utils/getFilterKey'

const filtersInitialState: InitialStateType = {
  filters,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },

    setFilter(state, action: PayloadAction<{ label: keyof typeof filterKeys; title: string }>) {
      const filters = state.filters.map((el) => {
        if (el.label === action.payload.label) {
          const items = el.items.map((item) => {
            if (item.title === action.payload.title) {
              return { ...item, checked: !item.checked }
            }

            return item
          })

          return { ...el, items }
        }

        return el
      })

      state.filters = filters
    },

    //
  },
  extraReducers: (builder) => {},
})

export const { setLoadingStatus, setFilter } = filtersSlice.actions

export default filtersSlice.reducer

export const filtersSelector = (state: RootState) => state.filters
