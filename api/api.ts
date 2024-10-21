import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import {
  AuthMeType,
  AuthLoginType,
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
import { LOCAL_STORAGE_TOKEN_KEY } from '@/constans'
import { DialogType, MessageType } from '../redux/dialogs/dialogsTypes'
import { AdvertisementType, FileType, ICreateAdFields } from '@/redux/advertisements/advertisementsTypes'

const instanse = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
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
  // getMe(payload: AuthMeType) {
  getMe() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

    if (!token) {
      return { data: null }
    }

    return instanse.post<AuthType>('/auth/me', { token })
  },

  // updateTutor(payload: UpdateTutorType) {
  //   const { id, ...data } = payload
  //   return instanse.patch(`/tutors/${id}`, data)
  // },
  // updateStudent(payload: UpdateStudentType) {
  //   const { id, ...data } = payload
  //   return instanse.patch(`/student/${id}`, data)
  // },
}

export const adAPI = {
  get(query: any) {
    return instanse.get<[AdvertisementType[], number]>('/advertisement', { params: query })
  },
  getById(id: number) {
    return instanse.get<AdvertisementType>(`/advertisement/${id}`)
  },
  getMy(id: number) {
    return instanse.get<AdvertisementType[]>(`/advertisement/my/${id}`)
  },
  getNotAccepted() {
    return instanse.get<AdvertisementType[]>(`/advertisement/get-not-accepted`)
  },
  create(payload: ICreateAdFields) {
    return instanse.post<AdvertisementType>('/advertisement', payload)
  },
  update(payload: ICreateAdFields) {
    const { id, ...rest } = payload
    return instanse.patch<AdvertisementType>(`/advertisement/${id}`, rest)
  },
  accept(id: number) {
    return instanse.patch<AdvertisementType>(`/advertisement/accept/${id}`)
  },
  delete(id: number) {
    return instanse.delete<number>(`/advertisement/${id}`)
  },
}

export const dialogsAPI = {
  getAll(id: number) {
    return instanse.get<DialogType[]>(`/dialogs/${id}`)
  },
  // checkIsExist(payload: CheckIsDialogExistType) {
  //   const { tutor, student } = payload
  //   return instanse.get<DialogType>(`/dialogs/check-is-exist/${tutor}/${student}`)
  // },
  create(payload: CreateDialogType) {
    return instanse.post<DialogType>(`/dialogs`, payload)
  },
  delete(id: number) {
    return instanse.delete<number>(`/dialogs/${id}`)
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

export const filesAPI = {
  upload(payload: UploadFileType) {
    const { /* adId, */ file } = payload
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    return instanse.post<FileType>('/files', file, config)
    // return instanse.post<FileType>(`/files/${adId}`, file, config)
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
