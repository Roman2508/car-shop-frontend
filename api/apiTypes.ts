import { AuthType } from '../redux/auth/authTypes'
import { LessonType } from '../redux/lessons/lessonsType'
import { ReservedLessonType } from '../redux/reservedLessons/reservedLessonsTypes'

/* auth */
export type AuthLoginType = {
  email: string
  password: string
  userRole: 'tutor' | 'student'
}

export type AuthRegisterType = {
  email: string
  password: string
  name: string
  userRole: 'tutor' | 'student'
}

export type AuthMeType = {
  token: string
}

export type AuthResponceType = {
  user: AuthType
  accessToken: string
}
/* // auth */

/* users */
export type UpdateTutorType = {
  id: number
  name?: string
  email?: string
  password?: string
}
export type UpdateStudentType = UpdateTutorType & { description?: string }
/* // users */

/* lessons */
export type LessonsFilterType = {
  name: string
  tutorName: string
  price: [number, number]
  sortBy: 'price-desc' | 'price-asc' | 'reviews-desc' | 'rating-desc'
  currentPage: number
  pageSize: number
}

export type CreateLessonType = {
  name: string
  price: number
  tutor: number
  duration: number
  theme?: string
}

export type UpdateLessonType = {
  id: number
  name: string
  price: number
  duration: number
  theme?: string
}

export type GetLessonsResponce = {
  entities: LessonType[]
  page: number
  size: number
  totalCount: number
}
/* // lessons */

/* dialogs */
export type GetDialogsType = { id: number; userRole: 'tutor' | 'student' }
export type DeleteDialogType = GetDialogsType
export type CreateDialogType = { tutor: number; student: number }
export type CheckIsDialogExistType = CreateDialogType
/* // dialogs */

/* messages */
export type CreateMessageType = {
  text: string
  sender: number
  dialog: number
  userRole: string
}
/* // messages */

/* reservedLessons */
export type ReservedLessonsFilterType = {
  name: string
  student?: number
  tutor?: number
  sortBy: 'price-desc' | 'price-asc' | 'startAt-desc' | 'startAt-asc'
  currentPage: number
  pageSize: number
}

export type CreateReservedLessonsType = {
  name: string
  theme: string
  price: number
  status: 'planned'
  duration: number
  startAt: Date
  tutor: number
  student: number
}

export type UpdateReservedLessonsType = {
  id: number
  theme: string
  price: number
  status: 'planned' | 'conducted'
  duration: number
  meetUrl: string
}

export type GetResevedLessonsResponceType = {
  entities: ReservedLessonType[]
  totalCount: number
  page: number
  size: number
}

export type PaymentBodyType = { amount: number; description: string }
export type PaymentResponseType = {
  response: {
    checkout_url: string
    payment_id: string
    response_status: 'success' | 'failure'
  }
}
/* // reservedLessons */

/* reviews */
export type CreateReviewsType = {
  sender: number
  recipient: number
  message: string
  rating: number
}
/* // reviews */

/* files */
export type UploadFileType = {
  lessonId: number
  file: FormData
}
/* // files */
