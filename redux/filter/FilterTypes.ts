import { filterKeys } from '@/utils/getFilterKey'
import { LoadingStatusTypes } from './../appTypes'

export type InitialStateType = {
  filters: IFilter[]
  loadingStatus: LoadingStatusTypes
}

export interface IFilter {
  label: keyof typeof filterKeys
  items: IFilterItem[]
}

export interface IFilterItem {
  checked: boolean
  id?: string
  title: string
  event: string
}
