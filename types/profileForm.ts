import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

export type ProfileInputs = {
  name: string
  email: string
  password: string
}

export interface IProfileInput {
  register: UseFormRegister<ProfileInputs>
  errors: Partial<FieldErrorsImpl<ProfileInputs>>
  darkModeClass?: string
}
