import { EventAndDate, Language, ObjectWithLanguage } from '../../types/common'
import { ImageView } from './image.types'
import { LinkCreation, LinkView } from './link.types'

export type ProjectCreation = {
  readonly name: string
  readonly description: ObjectWithLanguage
  readonly type: string
  readonly spendTime: string
  readonly stack: string[]
  readonly events: EventAndDate[]
  readonly links: LinkCreation[]
  readonly imagesId?: string[]
}

export type ProjectView = Partial<Omit<ProjectCreation, 'imagesId' | 'description' | 'links'>> & {
  readonly id?: string
  readonly description?: string
  readonly images?: ImageView[]
  readonly links?: LinkView[]
  readonly languages?: Language[]
  readonly currentLanguage?: Language
}

export type ProjectViewMultilingual = Partial<Omit<ProjectCreation, 'imagesId' | 'links'>> & {
  readonly id?: string
  readonly images?: ImageView[]
  readonly links?: LinkView[]
}

export type ProjectList = {
  currentLanguage: string
  languages: string[]
  pagination?: {
    page: number
    pageSize: number
    totalPages: number
  }
  sorted?: string[]
  items: ProjectView[]
}
