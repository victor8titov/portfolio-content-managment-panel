import { Pagination } from '../../types/common'

export type ImageByTemplateView = {
  url: string
  name: string
  template: string
  width?: number | null | string
  height?: number | null | string
}

export type ImageByTemplateCreation = Omit<ImageByTemplateView, 'url'>

export type ImageView = {
  id: string
  description: string
  divisionByTemplates: ImageByTemplateView[]
}

export type ImageCreation = Omit<ImageView, 'id' | 'divisionByTemplates'> & {
  divisionByTemplates: ImageByTemplateCreation[]
}

export type ListImages = {
  pagination?: Pagination
  currentLanguage?: string
  supportedLanguages?: string[]
  items?: ImageView[]
}

export type AvatarCreation = {
  readonly type: string
  readonly imageId: string
}

export type AvatarView = {
  readonly type: string
  readonly image: ImageView
}
