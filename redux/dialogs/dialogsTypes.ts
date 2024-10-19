import { LoadingStatusTypes } from '../appTypes'
import { FileType } from '../reservedLessons/reservedLessonsTypes'

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
  senderStudent: {
    id: number
    name: string
    avatarUrl: string
  }
  senderTutor: {
    id: number
    name: string
    avatarUrl: string
  }
  // sender: {
  //   id: number
  //   name: string
  // }
  userRole: 'tutor' | 'student'
  dialog: {
    id: number
  }
  sendAt: Date
}
