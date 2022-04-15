import { ImageView } from './image.types'

export type LinkView = {
  readonly name: string
  readonly link: string
  readonly icon?: ImageView
}

export type LinkCreation = Omit<LinkView, 'icon'> & {
  imageId: string
}
