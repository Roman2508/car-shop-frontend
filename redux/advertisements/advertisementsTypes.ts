import { LoadingStatusTypes } from '../appTypes'
import { AuthType } from '../auth/authTypes'
import { FileType } from '../reservedLessons/reservedLessonsTypes'

export type InitialStateType = {
  advertisements: AdvertisementType[] | null
  fullAdvertisement: AdvertisementType | null
  newAdvertisements: AdvertisementType[] | null
  popularAdvertisements: AdvertisementType[] | null
  loadingStatus: LoadingStatusTypes
}

export type AdvertisementType = {
  id: number
  title: string
  description: string
  price: number
  status: 'АКТИВНЕ' | 'НЕАКТИВНЕ' | 'ОЧІКУЄ ПІДТВЕРДЖЕННЯ'
  category: string
  subcategory: string
  carType: string
  mileage: number
  сustomsСleared?: string
  engineVolume?: number
  theCarWasDrivenFrom?: string
  model: string
  yearOfRelease: number
  carBodyType: string
  seatsCount?: number
  color: string
  gearbox: string
  driveType: string
  fuelType: string
  varnishCoating: string
  technicalCondition: string[]
  comfort?: string[]
  multimedia?: string[]
  security?: string[]
  photos: FileType[]
  user: AuthType
  createdAt: string
}

export type ICreateAdFields = Omit<AdvertisementType, 'id' & 'status' & 'createdAt'>

// export interface ICreateAdFields {
//   title: string
//   description: string
//   price: number
//   category: string
//   subcategory: string
//   carType: string
//   mileage: number
//   сustomsСleared?: string
//   engineVolume?: number
//   theCarWasDrivenFrom?: string
//   model: string
//   yearOfRelease: number
//   carBodyType: string
//   seatsCount?: number
//   color: string
//   gearbox: string
//   driveType: string
//   fuelType: string
//   varnishCoating: string
//   technicalCondition: string[]
//   comfort?: string[]
//   multimedia?: string[]
//   security?: string[]
//   photos: string[]
//   user: number
// }
