import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { InitialStateType, LessonType } from './lessonsType'
import { getLessons, createLesson, updateLesson, deleteLesson } from './lessonsAsyncActions'
import { GetLessonsResponce } from '../../api/apiTypes'

const lessonsInitialState: InitialStateType = {
  lessons: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: lessonsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    /* getLessons */
    builder.addCase(getLessons.fulfilled, (state, action: PayloadAction<GetLessonsResponce>) => {
      state.lessons = action.payload.entities
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* createLesson */
    // builder.addCase(createLesson.fulfilled, (state, action: PayloadAction<LessonType>) => {
    //   if (!state.lessons) return
    //   state.lessons.push(action.payload)
    //   state.loadingStatus = LoadingStatusTypes.SUCCESS
    // })

    /* updateLesson */
    // builder.addCase(updateLesson.fulfilled, (state, action: PayloadAction<LessonType>) => {
    //   if (!state.lessons) return
    //   const lessons = state.lessons.map((el) => {
    //     if (el.id === action.payload.id) {
    //       return { ...el, ...action.payload }
    //     }
    //     return el
    //   })
    //   state.lessons = lessons
    //   state.loadingStatus = LoadingStatusTypes.SUCCESS
    // })
  },
})

export const { setLoadingStatus } = lessonsSlice.actions

export default lessonsSlice.reducer

export const lessonsSelector = (state: RootState) => state.lessons
