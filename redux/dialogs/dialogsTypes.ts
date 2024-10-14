import { LoadingStatusTypes } from '../appTypes'

export type InitialStateType = {
  dialogs: DialogType[] | null
  messages: MessageType[] | null
  loadingStatus: LoadingStatusTypes
}

export type DialogType = {
  id: number
  tutor: {
    id: number
    name: string
    avatarUrl: string
  }
  student: {
    id: number
    name: string
    avatarUrl: string
  }
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
