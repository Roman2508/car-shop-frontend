import { AuthType } from '../redux/auth/authTypes'

export type AuthLoginType = {
  email: string
  password: string
}

export type AuthRegisterType = {
  email: string
  password: string
  username: string
  role: 'USER'
}

export type AuthMeType = {
  token: string
}

export type AuthResponceType = {
  user: AuthType
  accessToken: string
}

export type UpdateUserType = {
  id: number
  username: string
  email: string
  password?: string
}

export type UpdateUserRoleType = {
  id: number
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
}

export type CreateDialogType = { members: number[]; advertisement: number }

export type CreateMessageType = {
  text: string
  sender: number
  dialog: number
  userRole: string
}

export type UploadFileType = {
  file: FormData
}
