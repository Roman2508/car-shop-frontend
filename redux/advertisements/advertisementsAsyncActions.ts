import { toast } from 'sonner'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { adAPI, filesAPI } from '@/api/api'
import { UploadFileType } from '@/api/apiTypes'
import { LoadingStatusTypes } from '../appTypes'
import { setLoadingStatus } from './advertisementsSlice'

export const getAdvertisements = createAsyncThunk('advertisements/getAdvertisements', async (query: any, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = adAPI.get(query)

  toast.promise(promise, {
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const getAdvertisementById = createAsyncThunk(
  'advertisements/getAdvertisementById',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = adAPI.getById(id)

    toast.promise(promise, {
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const getNewAdvertisements = createAsyncThunk('advertisements/getNewAdvertisements', async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = adAPI.getNew()

  toast.promise(promise, {
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const getBestsellers = createAsyncThunk('advertisements/getBestsellers', async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = adAPI.getBestsellers()

  toast.promise(promise, {
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const searchAdvertisements = createAsyncThunk(
  'advertisements/searchAdvertisements',
  async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = adAPI.search(title)

    toast.promise(promise, {
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const getMyAdvertisements = createAsyncThunk(
  'advertisements/getMyAdvertisements',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = adAPI.getMy(id)

    toast.promise(promise, {
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const getNotAccepted = createAsyncThunk('advertisements/getNotAccepted', async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = adAPI.getNotAccepted()

  toast.promise(promise, {
    error: (error) => {
      thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
      return (error as any)?.response?.data?.message || error.message
    },
  })

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const createAdvertisement = createAsyncThunk(
  'advertisements/createAdvertisement',
  async (payload: any, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = adAPI.create(payload)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Створено нове оголошення',
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const updateAdvertisement = createAsyncThunk(
  'advertisements/updateAdvertisement',
  async (payload: any, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = adAPI.update(payload)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Створено нове оголошення',
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const acceptAdvertisement = createAsyncThunk(
  'advertisements/acceptAdvertisement',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = adAPI.accept(id)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Змінено статус оголошення',
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

export const deleteAdvertisement = createAsyncThunk(
  'advertisements/deleteAdvertisement',
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    const promise = adAPI.delete(id)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Оголошення видалено',
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)

/* files */
export const uploadFile = createAsyncThunk('advertisements/uploadFile', async (payload: UploadFileType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  const promise = filesAPI.upload(payload)

  const { data } = await promise
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
  return data
})

export const deleteFile = createAsyncThunk(
  'advertisements/deleteFile',
  async (payload: { filename: string; fileId: number }, thunkAPI) => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))
    const promise = filesAPI.delete(payload)

    toast.promise(promise, {
      loading: 'Завантаження...',
      success: 'Фото видалено',
      error: (error) => {
        thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
        return (error as any)?.response?.data?.message || error.message
      },
    })

    const { data } = await promise
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  }
)
