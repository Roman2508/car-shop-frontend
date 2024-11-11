import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  getNotAccepted,
  getAdvertisements,
  getMyAdvertisements,
  acceptAdvertisement,
  getAdvertisementById,
} from './advertisementsAsyncActions'
import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { AdvertisementType, InitialStateType } from './advertisementsTypes'

const advertisementsInitialState: InitialStateType = {
  advertisements: null,
  fullAdvertisement: null,
  newAdvertisements: null,
  popularAdvertisements: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const advertisementsSlice = createSlice({
  name: 'advertisements',
  initialState: advertisementsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },

    clearAdvertisements(state) {
      state.advertisements = null
    },
    clearFullAdvertisements(state) {
      state.fullAdvertisement = null
    },
  },
  extraReducers: (builder) => {
    /* getAdvertisements */
    builder.addCase(getAdvertisements.fulfilled, (state, action: PayloadAction<[AdvertisementType[], number]>) => {
      state.advertisements = action.payload[0]
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* getAdvertisementById */
    builder.addCase(getAdvertisementById.fulfilled, (state, action: PayloadAction<AdvertisementType>) => {
      state.fullAdvertisement = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* getMyAdvertisements */
    builder.addCase(getMyAdvertisements.fulfilled, (state, action: PayloadAction<AdvertisementType[]>) => {
      state.advertisements = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* getNotAccepted */
    builder.addCase(getNotAccepted.fulfilled, (state, action: PayloadAction<AdvertisementType[]>) => {
      state.advertisements = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* acceptAdvertisement */
    builder.addCase(acceptAdvertisement.fulfilled, (state, action: PayloadAction<AdvertisementType>) => {
      if (!state.fullAdvertisement) return
      state.fullAdvertisement.status = action.payload.status
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus, clearAdvertisements, clearFullAdvertisements } = advertisementsSlice.actions

export default advertisementsSlice.reducer

export const advertisementsSelector = (state: RootState) => state.advertisements
