import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoadingStatus } from './advertisementsSlice'
import { LoadingStatusTypes } from '../appTypes'
import { adAPI, filesAPI } from '@/api/api'
import { UploadFileType } from '@/api/apiTypes'

export const createAdvertisement = createAsyncThunk(
  'createAdvertisement/createAdvertisement',
  async (payload: any, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = adAPI.create(payload)

    //   toast.promise(promise, {
    //     // loading: "Завантаження...",
    //     // success: "Завантажено",
    //     error: (error) => {
    //       thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    //       return (error as any)?.response?.data?.message || error.message
    //     },
    //   })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

/* files */
export const uploadFile = createAsyncThunk('advertisement/uploadFile', async (payload: UploadFileType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = filesAPI.upload(payload)

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data

  // thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
  // thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

  // try {
  //   const { data } = await filesAPI.upload(payload)
  //   thunkAPI.dispatch(setAppAlert({ message: 'Файл завантажено', status: 'success' }))
  //   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  //   return data
  // } catch (error: any) {
  //   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
  //   thunkAPI.dispatch(setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' }))
  //   throw error
  // }
})

export const deleteFile = createAsyncThunk(
  'advertisement/deleteFile',
  async (payload: { filename: string; fileId: number }, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    const promise = filesAPI.delete(payload)

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data

    // thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    // thunkAPI.dispatch(setAppAlert({ message: 'Завантаження...', status: 'info' }))

    // try {
    //   const { data } = await filesAPI.delete(payload)
    //   thunkAPI.dispatch(setAppAlert({ message: 'Файл видалено', status: 'success' }))
    //   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    //   return data
    // } catch (error: any) {
    //   thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    //   thunkAPI.dispatch(
    //     setAppAlert({ message: (error as any).response.data.message || error.message, status: 'error' })
    //   )
    //   throw error
    // }
  }
)
