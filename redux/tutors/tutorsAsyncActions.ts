import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { setLoadingStatus } from './tutorsSlice'
import { LoadingStatusTypes } from '../appTypes'
import { reviewsAPI, tutorsAPI } from '../../api/api'
import { CreateReviewsType } from '../../api/apiTypes'
import { TutorType } from './tutorsTypes'

export const getTutor = createAsyncThunk('lessons/getTutor', async (id: number, thunkAPI): Promise<TutorType> => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await tutorsAPI.getById(id)
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' }))
    throw error
  }
})

export const createReviews = createAsyncThunk('lessons/createReviews', async (payload: CreateReviewsType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await reviewsAPI.create(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Додано відгук', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' }))
    throw error
  }
})

export const deleteReviews = createAsyncThunk('lessons/deleteReviews', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await reviewsAPI.remove(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Відгук видалено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' }))
    throw error
  }
})
