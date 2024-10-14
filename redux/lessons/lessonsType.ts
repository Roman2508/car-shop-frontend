import { LoadingStatusTypes } from "../appTypes"

export type InitialStateType = {
  lessons: LessonType[] | null
  loadingStatus: LoadingStatusTypes
}

export type LessonType = {
  id: number
  name: string
  price: number
  tutor: {
    id: number
    name: string
    rating: number
    avatarUrl: string
    description: string
    studentsCount: number
    lessons: { id: number; name: string }[]
    reviews: { id: number }[]
  }
  duration: number
  createdAt: Date
}
