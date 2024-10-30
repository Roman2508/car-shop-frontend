import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { AuthType, InitialStateType } from './authTypes'
import { LoadingStatusTypes } from '../appTypes'
import { LOCAL_STORAGE_TOKEN_KEY } from '@/constans'
import { AuthResponceType } from '../../api/apiTypes'
import { authLogin, authRegister, getAllUsers, updateRole, uploadAvatar } from './authAsyncActions'

const authInitialState: InitialStateType = {
  auth: null,
  users: null,
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

    /* getAllUsers */
    builder.addCase(getAllUsers.fulfilled, (state, action: PayloadAction<AuthType[]>) => {
      state.users = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* uploadAvatar */
    builder.addCase(uploadAvatar.fulfilled, (state, action: PayloadAction<{ avatarUrl: string }>) => {
      if (!state.auth) return
      state.auth.avatarUrl = action.payload.avatarUrl
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* updateRole */
    builder.addCase(updateRole.fulfilled, (state, action: PayloadAction<AuthType>) => {
      if (!state.users) return

      const users = state.users.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, role: action.payload.role }
        }
        return el
      })

      state.users = users
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus, setUserData, logout } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state: RootState) => state.auth
