import { Language, ObjectWithLanguage } from '../../types/common'

export type SkillCreation = {
  name: string
  group?: string
  level?: number
  description?: ObjectWithLanguage
}

export type SkillView = Omit<Required<SkillCreation>, 'description'> & {
  id: string
  description: string
  currentLanguage?: Language
}

export type SkillViewMultilingual = Required<SkillCreation> & {
  id: string
}

export type ListSkillsResponse = {
  languages: Language[]
  currentLanguage: Language
  groups: string[]
  items: SkillView[]
}
