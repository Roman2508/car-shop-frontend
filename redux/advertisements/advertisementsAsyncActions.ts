import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoadingStatus } from './advertisementsSlice'
import { LoadingStatusTypes } from '../appTypes'
import { adAPI } from '@/api/api'

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
