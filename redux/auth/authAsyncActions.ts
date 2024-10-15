import { toast } from 'sonner'

import { LoadingStatusTypes } from '../appTypes'
import { authAPI, filesAPI } from '../../api/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/constans'
import { setAppAlert } from '../appStatus/appStatusSlice'
import { setLoadingStatus } from '../lessons/lessonsSlice'
import { AuthLoginType, AuthMeType, AuthRegisterType } from '../../api/apiTypes'

export const authLogin = createAsyncThunk('auth/authLogin', async (payload: AuthLoginType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  const promise = authAPI.login(payload)

  toast.promise(promise, {
    loading: 'Завантаження...',
    success: 'Вхід до облікового запису виконано!',
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise

  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.accessToken)
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data

  // thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
  // thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  // try {
  //   const { data } = await authAPI.login(payload)
  //   thunkAPI.dispatch(setAppAlert({ message: 'Авторизований', status: 'success' }))
  //   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  //   window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.accessToken)
  //   return data
  // } catch (error: any) {
  //   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
  //   thunkAPI.dispatch(
  //     setAppAlert({
  //       message: (error as any).response.data.message || error.message,
  //       status: 'error',
  //     })
  //   )
  //   throw error
  // }
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

export const authMe = createAsyncThunk('auth/authMe', async (_: undefined, thunkAPI) => {
  // thunkAPI.dispatch(setAppAlert({ message: 'Завантаження', status: 'info' }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.getMe()
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

// export const updateTutor = createAsyncThunk('auth/updateTutor', async (payload: UpdateTutorType, thunkAPI) => {
//   thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
//   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

//   try {
//     const { data } = await authAPI.updateTutor(payload)
//     thunkAPI.dispatch(setAppAlert({ message: 'Оновлено', status: 'success' }))
//     thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
//     return data
//   } catch (error: any) {
//     thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
//     thunkAPI.dispatch(
//       setAppAlert({
//         message: (error as any).response.data.message || error.message,
//         status: 'error',
//       })
//     )
//     throw error
//   }
// })

// export const updateStudent = createAsyncThunk('auth/updateStudent', async (payload: UpdateStudentType, thunkAPI) => {
//   thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))
//   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

//   try {
//     const { data } = await authAPI.updateStudent(payload)
//     thunkAPI.dispatch(setAppAlert({ message: 'Оновлено', status: 'success' }))
//     thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
//     return data
//   } catch (error: any) {
//     thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
//     thunkAPI.dispatch(
//       setAppAlert({
//         message: (error as any).response.data.message || error.message,
//         status: 'error',
//       })
//     )
//     throw error
//   }
// })

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
