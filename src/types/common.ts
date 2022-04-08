
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
