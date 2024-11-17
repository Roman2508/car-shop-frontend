import { LoadingStatusTypes } from '../appTypes'
import { FileType } from '../advertisements/advertisementsTypes'

export type InitialStateType = {
  dialogs: DialogType[] | null
  messages: MessageType[] | null
  loadingStatus: LoadingStatusTypes
}

export type DialogType = {
  id: number
  members: { id: number; username: string; avatarUrl: string }[]
  advertisement: { id: number; title: string; status: true; photos: FileType[]; createdAt: string }
  messages: MessageType[]
}

export type MessageType = {
  id: number
  text: string
  isReaded: boolean
  sender: { id: number; name: string; avatarUrl: string }
  dialog: { id: number }
  sendAt: string
}
