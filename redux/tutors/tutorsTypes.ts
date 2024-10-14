import { LoadingStatusTypes } from '../appTypes'
import { DialogType } from '../dialogs/dialogsTypes'
import { LessonType } from '../lessons/lessonsType'
import { ReservedLessonType } from '../reservedLessons/reservedLessonsTypes'

export type InitialStateType = {
  tutor: TutorType | null
  loadingStatus: LoadingStatusTypes
}

export type TutorType = {
  id: number
  name: string
  userRole: 'tutor'
  email: string
  avatarUrl: string
  description: string
  rating: number
  studentsCount: number
  reviews: ReviewsType[]
  dialogs: DialogType[]
  lessons: LessonType[]
  reservedLessons: ReservedLessonType[]
  createdAt: Date
}

export type ReviewsType = {
  id: number
  sender: {
    id: number
    name: string
    avatarUrl: string
    userRole: 'tutor' | 'student'
  }
  // recipient: {
  //   id: number
  //   name: string
  // }
  message: string
  rating: number
  createdAt: Date
}
