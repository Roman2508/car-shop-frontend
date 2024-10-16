import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth/authSlice'
import tutorsSlice from './tutors/tutorsSlice'
import lessonsSlice from './lessons/lessonsSlice'
import dialogsSlice from './dialogs/dialogsSlice'
import appStatusSlice from './appStatus/appStatusSlice'
import advertisementsSlice from './advertisements/advertisementsSlice'
import reservedLessonsSlice from './reservedLessons/reservedLessonsSlice'

export const store = configureStore({
  reducer: {
    appStatus: appStatusSlice,
    lessons: lessonsSlice,
    dialogs: dialogsSlice,
    reservedLessons: reservedLessonsSlice,
    tutors: tutorsSlice,
    auth: authSlice,
    advertisements: advertisementsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
