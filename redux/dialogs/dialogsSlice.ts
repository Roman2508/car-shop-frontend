import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LoadingStatusTypes } from "../appTypes"
import { DialogType, InitialStateType, MessageType } from "./dialogsTypes"
import { RootState } from "../store"
import {
  createDialog,
  createMessage,
  deleteDialog,
  deleteMessages,
  getDialogs,
  getMessages,
  updateIsReading,
} from "./dialogsAsyncActions"

const dialogsInitialState: InitialStateType = {
  dialogs: null,
  messages: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState: dialogsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },

    addMessage(state, action: PayloadAction<MessageType>) {
      if (!state.messages) return
      const isHasDublicate = state.messages.some((el) => el.id === action.payload.id)

      if (!isHasDublicate) {
        state.messages.push(action.payload)
      }
    },

    clearMessages(state) {
      state.messages = null
    },
  },
  extraReducers: (builder) => {
    /* getDialogs */
    builder.addCase(getDialogs.fulfilled, (state, action: PayloadAction<DialogType[]>) => {
      state.dialogs = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* createDialog */
    builder.addCase(createDialog.fulfilled, (state, action: PayloadAction<DialogType>) => {
      if (!state.dialogs) return
      state.dialogs.push(action.payload)
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* deleteDialog */
    builder.addCase(deleteDialog.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.dialogs) return
      const dialogs = state.dialogs.filter((el) => el.id !== action.payload)
      state.dialogs = dialogs
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* getMessages */
    builder.addCase(getMessages.fulfilled, (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* createMessage */
    builder.addCase(createMessage.fulfilled, (state, action: PayloadAction<MessageType>) => {
      if (!state.messages) return
      state.messages.push(action.payload)
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* updateIsReading */
    builder.addCase(updateIsReading.fulfilled, (state, action: PayloadAction<MessageType>) => {
      if (!state.messages) return
      const messages = state.messages.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
      state.messages = messages
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* deleteMessages */
    builder.addCase(deleteMessages.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.messages) return
      const messages = state.messages.filter((el) => el.id !== action.payload)
      state.messages = messages
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus, addMessage, clearMessages } = dialogsSlice.actions

export default dialogsSlice.reducer

export const dialogsSelector = (state: RootState) => state.dialogs
