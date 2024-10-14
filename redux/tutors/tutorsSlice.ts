import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { InitialStateType, ReviewsType, TutorType } from "./tutorsTypes"
import { createReviews, deleteReviews, getTutor } from "./tutorsAsyncActions"
import { createLesson, deleteLesson, updateLesson } from "../lessons/lessonsAsyncActions"
import { LessonType } from "../lessons/lessonsType"

const lessonsInitialState: InitialStateType = {
  tutor: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const tutorSlice = createSlice({
  name: "lessons",
  initialState: lessonsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
    clearTutor(state) {
      state.tutor = null
    },
  },
  extraReducers: (builder) => {
    /* getTutor */
    builder.addCase(getTutor.fulfilled, (state, action: PayloadAction<TutorType>) => {
      state.tutor = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* createLesson */
    builder.addCase(createLesson.fulfilled, (state, action: PayloadAction<LessonType>) => {
      if (!state.tutor) return
      state.tutor.lessons.push(action.payload)
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* updateLesson */
    builder.addCase(updateLesson.fulfilled, (state, action: PayloadAction<LessonType>) => {
      if (!state.tutor) return
      const lessons = state.tutor.lessons.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
      state.tutor.lessons = lessons
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* deleteLesson */
    builder.addCase(deleteLesson.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.tutor) return
      const lessons = state.tutor.lessons.filter((el) => el.id !== action.payload)
      state.tutor.lessons = lessons
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* createReviews */
    builder.addCase(createReviews.fulfilled, (state, action: PayloadAction<ReviewsType>) => {
      if (!state.tutor) return
      state.tutor.reviews.push(action.payload)
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* deleteReviews */
    builder.addCase(deleteReviews.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.tutor) return
      const reviews = state.tutor.reviews.filter((el) => el.id !== action.payload)

      state.tutor.reviews = reviews
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus, clearTutor } = tutorSlice.actions

export default tutorSlice.reducer

export const tutorsSelector = (state: RootState) => state.tutors
