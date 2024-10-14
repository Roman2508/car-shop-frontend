import { LoadingStatusTypes } from '../appTypes'

export type InitialStateType = {
  auth: AuthType | null
  loadingStatus: LoadingStatusTypes
}

export type AuthType = {
  id: number
  name: string
  userRole: 'tutor' | 'student'
  email: string
  avatarUrl: string
  description?: string
  createdAt: Date
}
