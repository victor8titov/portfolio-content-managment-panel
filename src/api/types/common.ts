import { Language } from '../../types/common'

export type SimpleResponse = {
  id: string
  message: string
}

export type QueryParameters = {
  page: number
  pageSize: number
  language: Language
}
