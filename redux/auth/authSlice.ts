import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { AuthType, InitialStateType } from './authTypes'
import { authLogin, authMe, authRegister, uploadAvatar } from './authAsyncActions'
import { AuthResponceType } from '../../api/apiTypes'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/constans'

const authInitialState: InitialStateType = {
  auth: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },

    setUserData(state, action) {
      state.auth = action.payload
    },

    logout(state) {
      state.auth = null
      window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
    },
  },
  extraReducers: (builder) => {
    /* authLogin */
    builder.addCase(authLogin.fulfilled, (state, action: PayloadAction<AuthResponceType>) => {
      state.auth = action.payload.user
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* authRegister */
    builder.addCase(authRegister.fulfilled, (state, action: PayloadAction<AuthResponceType>) => {
      state.auth = action.payload.user
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* authMe */
    // builder.addCase(authMe.fulfilled, (state, action: PayloadAction<AuthType>) => {
    //   state.auth = action.payload
    //   state.loadingStatus = LoadingStatusTypes.SUCCESS
    // })

    // /* updateTutor */
    // builder.addCase(updateTutor.fulfilled, (state, action: PayloadAction<AuthType>) => {
    //   state.auth = action.payload
    //   state.loadingStatus = LoadingStatusTypes.SUCCESS
    // })

    // /* updateStudent */
    // builder.addCase(updateStudent.fulfilled, (state, action: PayloadAction<AuthType>) => {
    //   state.auth = action.payload
    //   state.loadingStatus = LoadingStatusTypes.SUCCESS
    // })

    /* uploadAvatar */
    builder.addCase(uploadAvatar.fulfilled, (state, action: PayloadAction<{ avatarUrl: string }>) => {
      if (!state.auth) return
      state.auth.avatarUrl = action.payload.avatarUrl
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus, setUserData, logout } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state: RootState) => state.auth
