import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  CreateReservedLessonsType,
  ReservedLessonsFilterType,
  UpdateReservedLessonsType,
  UploadFileType,
} from '../../api/apiTypes'

import { LoadingStatusTypes } from '../appTypes'
import { setLoadingStatus } from './reservedLessonsSlice'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { filesAPI, reservedLessonsAPI } from '../../api/api'

export const getReservedLessons = createAsyncThunk(
  'lessons/getReservedLessons',
  async (payload: ReservedLessonsFilterType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await reservedLessonsAPI.getAll(payload)
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' })
      )

      throw error
    }
  }
)

export const getReservedLessonById = createAsyncThunk('lessons/getReservedLessonById', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await reservedLessonsAPI.getOneById(id)
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' }))
    throw error
  }
})

export const createReservedLesson = createAsyncThunk(
  'lessons/createReservedLesson',
  async (payload: CreateReservedLessonsType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await reservedLessonsAPI.create(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Заплановано новий урок', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' })
      )
      throw error
    }
  }
)

export const updateReservedLesson = createAsyncThunk(
  'lessons/updateReservedLesson',
  async (payload: UpdateReservedLessonsType, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await reservedLessonsAPI.update(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Урок оновлено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' })
      )
      throw error
    }
  }
)

export const deleteReservedLesson = createAsyncThunk('lessons/deleteReservedLesson', async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await reservedLessonsAPI.delete(id)
    thunkAPI.dispatch(setAppAlert({ message: 'Урок видалено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' }))
    throw error
  }
})

/* files */
export const uploadFile = createAsyncThunk('lessons/uploadFile', async (payload: UploadFileType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  try {
    const { data } = await filesAPI.upload(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Файл завантажено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' }))
    throw error
  }
})

export const deleteFile = createAsyncThunk(
  'lessons/deleteFile',
  async (payload: { filename: string; fileId: number }, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    try {
      const { data } = await filesAPI.delete(payload)
      thunkAPI.dispatch(setAppAlert({ message: 'Файл видалено', status: 'success' }))
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
      return data
    } catch (error: any) {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      thunkAPI.dispatch(
        setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' })
      )
      throw error
    }
  }
)
