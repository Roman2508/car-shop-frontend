import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

type InitialStateType = { mode: 'light' | 'dark' }

const initialState: InitialStateType = {
  mode: 'light',
}

const themeSliceSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload
    },
  },
})

export const { setMode } = themeSliceSlice.actions

export const themeSelector = (state: RootState) => state.theme

export default themeSliceSlice.reducer
