import { createAsyncThunk } from '@reduxjs/toolkit'

import { authAPI, filesAPI } from '../../api/api'
import { LoadingStatusTypes } from '../appTypes'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { setLoadingStatus } from '../lessons/lessonsSlice'
import { AuthLoginType, AuthMeType, AuthRegisterType, UpdateStudentType, UpdateTutorType } from '../../api/apiTypes'

export const authLogin = createAsyncThunk('auth/authLogin', async (payload: AuthLoginType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.login(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Авторизований', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    window.localStorage.setItem('tutor-token', data.accessToken)
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

export const authRegister = createAsyncThunk('auth/authRegister', async (payload: AuthRegisterType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.register(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Авторизований', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

export const authMe = createAsyncThunk('auth/authMe', async (payload: AuthMeType, thunkAPI) => {
  // thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.getMe(payload)
    // thunkAPI.dispatch(setAppAlert({ message: 'Авторизований', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any)?.response?.data?.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

export const updateTutor = createAsyncThunk('auth/updateTutor', async (payload: UpdateTutorType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.updateTutor(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Оновлено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

export const updateStudent = createAsyncThunk('auth/updateStudent', async (payload: UpdateStudentType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.updateStudent(payload)
    thunkAPI.dispatch(setAppAlert({ message: 'Оновлено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})

export const uploadAvatar = createAsyncThunk('auth/uploadAvatar', async (file: FormData, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await filesAPI.uploadAvatar(file)
    thunkAPI.dispatch(setAppAlert({ message: 'Фото оновлено', status: 'success' }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: 'error',
      })
    )
    throw error
  }
})
