import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoadingStatusTypes } from '../appTypes'
import { RootState } from '../store'
import { AdvertisementType, InitialStateType } from './advertisementsTypes'
import {
  acceptAdvertisement,
  createAdvertisement,
  deleteFile,
  getAdvertisementById,
  getAdvertisements,
  uploadFile,
} from './advertisementsAsyncActions'
import { FileType } from '../reservedLessons/reservedLessonsTypes'

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

    clearAllAdvertisements(state) {
      state.advertisements = null
      state.newAdvertisements = null
      state.popularAdvertisements = null
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

    /* acceptAdvertisement */
    builder.addCase(acceptAdvertisement.fulfilled, (state, action: PayloadAction<AdvertisementType>) => {
      if (!state.fullAdvertisement) return
      state.fullAdvertisement.status = action.payload.status
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* deleteDialog */
    // builder.addCase(deleteDialog.fulfilled, (state, action: PayloadAction<number>) => {
    //   if (!state.dialogs) return
    //   const dialogs = state.dialogs.filter((el) => el.id !== action.payload)
    //   state.dialogs = dialogs
    //   state.loadingStatus = LoadingStatusTypes.SUCCESS
    // })

    /* uploadFile */
    //  builder.addCase(uploadFile.fulfilled, (state, action: PayloadAction<FileType>) => {
    //   if (!state.fullLesson) return
    //   state.fullLesson.files.push(action.payload)
    //   state.loadingStatus = LoadingStatusTypes.SUCCESS
    // })

    /* deleteFile */
    // builder.addCase(deleteFile.fulfilled, (state, action: PayloadAction<{ id: number; filename: string }>) => {
    //   if (!state.fullLesson) return
    //   const files = state.fullLesson.files.filter((el) => el.id !== action.payload.id)
    //   state.fullLesson.files = files
    //   state.loadingStatus = LoadingStatusTypes.SUCCESS
    // })
  },
})

export const { setLoadingStatus, clearAllAdvertisements, clearFullAdvertisements } = advertisementsSlice.actions

export default advertisementsSlice.reducer

export const advertisementsSelector = (state: RootState) => state.advertisements
