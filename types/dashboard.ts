import { IBoilerPart } from './boilerparts'

export interface IDashboardSlider {
  items: IBoilerPart[]
  spinner: boolean
  goToPartPage?: boolean
}
