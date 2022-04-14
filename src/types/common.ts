import { ImageView } from '../api/types/image.types'

export type ObjectWithLanguage = {
  [K in Language]: string
}

export enum Language {
  RU = 'ru',
  EN = 'en'
}

export type Pagination = {
  page: number
  pageSize: number
  totalPages: number
}

export type EventAndDate = {
  date: string
  status: string
}

export type LinkView = {
  readonly name: string
  readonly link: string
  readonly icon?: ImageView
}

export type LinkCreation = Omit<LinkView, 'icon'> & {
  imageId: string
}
