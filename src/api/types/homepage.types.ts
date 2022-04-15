import { Language, ObjectWithLanguage } from '../../types/common'
import { AvatarCreation, AvatarView } from './image.types'

export type HomePageMultilingualResponse = {
  readonly languages?: Language[]
  readonly title?: ObjectWithLanguage
  readonly subtitle?: ObjectWithLanguage
  readonly description?: ObjectWithLanguage
  readonly avatars?: AvatarView[] | null
}

export type HomePageCreation = {
  readonly title?: ObjectWithLanguage
  readonly subtitle?: ObjectWithLanguage
  readonly description?: ObjectWithLanguage
  readonly avatars?: AvatarCreation[] | null
}
