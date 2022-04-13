import { EventAndDate, Language, ObjectWithLanguage } from '../../types/common'

export type TimeStampCreation = {
  name: string
  link?: string
  events: EventAndDate[]
  description: ObjectWithLanguage
}

export type TimeStampView = Omit<Required<TimeStampCreation>, 'description'> & {
  id: string
  description: string
  currentLanguage?: Language
}

export type TimeStampViewMultilingual = Required<TimeStampCreation> & {
  id: string
}

export type ListTimeStamps = {
  languages: Language[]
  currentLanguage: Language
  items: TimeStampView[]
}
