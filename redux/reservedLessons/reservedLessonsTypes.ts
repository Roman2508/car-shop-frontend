import { LoadingStatusTypes } from '../appTypes'

export type InitialStateType = {
  reservedLessons: ReservedLessonType[] | null
  fullLesson: ReservedLessonType | null
  loadingStatus: LoadingStatusTypes
}

export type ReservedLessonType = {
  id: number
  name: string
  theme: string | null
  price: number
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
  status: 'planned' | 'conducted'
  duration: number
  files: FileType[]
  meetUrl: string
  startAt: Date
  createdAt: Date
}

export type FileType = {
  id: number
  filename: string
  originalName: string
  size: number
  mimetype: string
  lesson: {
    id: number
    name: string
  }
  user: {
    id: number
    name: string
  }
  authorRole: 'tutor' | 'student'
  createdAt: Date
}
