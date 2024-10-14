import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import {
  AuthMeType,
  AuthLoginType,
  GetDialogsType,
  AuthRegisterType,
  CreateDialogType,
  CreateMessageType,
  CreateReviewsType,
  LessonsFilterType,
  ReservedLessonsFilterType,
  UpdateReservedLessonsType,
  CreateReservedLessonsType,
  CreateLessonType,
  UpdateLessonType,
  GetLessonsResponce,
  UpdateTutorType,
  UpdateStudentType,
  AuthResponceType,
  GetResevedLessonsResponceType,
  UploadFileType,
  PaymentResponseType,
  CheckIsDialogExistType,
} from './apiTypes'
import { AuthType } from '../redux/auth/authTypes'
import { LessonType } from '../redux/lessons/lessonsType'
import { DialogType, MessageType } from '../redux/dialogs/dialogsTypes'
import { ReviewsType, TutorType } from '../redux/tutors/tutorsTypes'
import { FileType, ReservedLessonType } from '../redux/reservedLessons/reservedLessonsTypes'
import { AdvertisementType, ICreateAdFields } from '@/redux/advertisements/advertisementsTypes'

const instanse = axios.create({
  baseURL: 'http://localhost:7777/',
})

// Якщо є токен, вшиваю його в конфігурацію axios
// @ts-ignore
instanse.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // const token = window.localStorage.getItem('car-app-token')

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI4OTI5NTA3LCJleHAiOjE3MzE1MjE1MDd9.IiCgv2pNNfE3GdCVYdrpD7epnb26duB-bVRiENrUc4I'

  if (config.headers && token) {
    config.headers.Authorization = String(`Bearer ${token}`)
    // config.headers.Authorization = String(window.localStorage.getItem('token'))
  }

  return config
})

export const authAPI = {
  login(payload: AuthLoginType) {
    return instanse.post<AuthResponceType>('/auth/login', payload)
  },
  register(payload: AuthRegisterType) {
    return instanse.post<AuthResponceType>('/auth/register', payload)
  },
  getMe(payload: AuthMeType) {
    return instanse.post<AuthType>('/auth/me', payload)
  },

  updateTutor(payload: UpdateTutorType) {
    const { id, ...data } = payload
    return instanse.patch(`/tutors/${id}`, data)
  },
  updateStudent(payload: UpdateStudentType) {
    const { id, ...data } = payload
    return instanse.patch(`/student/${id}`, data)
  },
}

export const adAPI = {
  get() {
    return instanse.get<AdvertisementType[]>('/advertisement')
  },
  create(payload: ICreateAdFields) {
    return instanse.post<AdvertisementType>('/advertisement', payload)
  },
}

export const lessonsAPI = {
  getAll(payload: LessonsFilterType) {
    return instanse.post<GetLessonsResponce>('/lessons/get', payload)
  },
  create(payload: CreateLessonType) {
    return instanse.post<LessonType>('/lessons', payload)
  },
  update(payload: UpdateLessonType) {
    const { id, ...rest } = payload
    return instanse.patch<LessonType>(`/lessons/${id}`, rest)
  },
  delete(id: number) {
    return instanse.delete<number>(`/lessons/${id}`)
  },
}

export const tutorsAPI = {
  getById(id: number) {
    return instanse.get<TutorType>(`/tutors/${id}`)
  },
}

export const dialogsAPI = {
  getAll(payload: GetDialogsType) {
    const { id, userRole } = payload
    return instanse.get<DialogType[]>(`/dialogs/${id}/${userRole}`)
  },
  checkIsExist(payload: CheckIsDialogExistType) {
    const { tutor, student } = payload
    return instanse.get<DialogType>(`/dialogs/check-is-exist/${tutor}/${student}`)
  },
  create(payload: CreateDialogType) {
    return instanse.post<DialogType>(`/dialogs`, payload)
  },
  delete(payload: GetDialogsType) {
    const { id, userRole } = payload
    return instanse.delete<number>(`/dialogs/${id}/${userRole}`)
  },
}

export const messagesAPI = {
  getAll(id: number) {
    return instanse.get<MessageType[]>(`/messages/${id}`)
  },
  create(payload: CreateMessageType) {
    return instanse.post<MessageType>('/messages', payload)
  },
  updateIsReading(id: number) {
    return instanse.patch<MessageType>(`/messages/${id}`)
  },
  delete(id: number) {
    return instanse.delete<number>(`/messages/${id}`)
  },
}

export const reviewsAPI = {
  async create(payload: CreateReviewsType) {
    return instanse.post<ReviewsType>('/reviews', payload)
  },
  remove(id: number) {
    return instanse.delete<number>(`/reviews/${id}`)
  },
}

export const reservedLessonsAPI = {
  getAll(payload: ReservedLessonsFilterType) {
    return instanse.post<GetResevedLessonsResponceType>('/reserved-lessons/get', payload)
  },
  getOneById(id: number) {
    return instanse.get<ReservedLessonType>(`/reserved-lessons/${id}`)
  },
  // not for frontend
  create(payload: CreateReservedLessonsType) {
    return instanse.post<ReservedLessonType>('/reserved-lessons', payload)
  },
  update(payload: UpdateReservedLessonsType) {
    const { id, ...data } = payload
    return instanse.patch<ReservedLessonType>(`/reserved-lessons/${id}`, data)
  },
  payment(payload: CreateReservedLessonsType) {
    return instanse.post<PaymentResponseType>(`/reserved-lessons/payment`, payload)
  },
  delete(id: number) {
    return instanse.delete<number>(`/reserved-lessons/${id}`)
  },
}

export const filesAPI = {
  upload(payload: UploadFileType) {
    const { lessonId, file } = payload
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    return instanse.post<FileType>(`/files/${lessonId}`, file, config)
  },

  download(filename: string) {
    const config = { responseType: 'blob' }
    // @ts-ignore
    return instanse.get(`files/download/${filename}`, config)
  },

  uploadAvatar(file: FormData) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    return instanse.post<{ avatarUrl: string }>(`/files/avatar`, file, config)
  },

  delete(payload: { filename: string; fileId: number }) {
    return instanse.delete<{ id: number; filename: string }>(`/files/${payload.filename}/${payload.fileId}`)
  },
}
