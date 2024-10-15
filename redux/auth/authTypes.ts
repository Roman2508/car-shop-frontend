import { LoadingStatusTypes } from '../appTypes'

export type InitialStateType = {
  auth: AuthType | null
  loadingStatus: LoadingStatusTypes
}

export type AuthType = {
  id: number
  username: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
  email: string
  phone: string | null
  avatarUrl: string
  description?: string
  createdAt: Date
}
