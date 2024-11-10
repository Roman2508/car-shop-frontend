import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth/authSlice'
import themeSlice from './theme/themeSlice'
import filterSlice from './filter/filterSlice'
import dialogsSlice from './dialogs/dialogsSlice'
import appStatusSlice from './appStatus/appStatusSlice'
import advertisementsSlice from './advertisements/advertisementsSlice'

export const store = configureStore({
  reducer: {
    appStatus: appStatusSlice,
    dialogs: dialogsSlice,
    auth: authSlice,
    advertisements: advertisementsSlice,
    filters: filterSlice,
    theme: themeSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
