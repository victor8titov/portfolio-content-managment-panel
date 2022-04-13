import { ImageView } from '../api/types/image.types'
export type ImageTemplate = 'original' | 'mid' | 'small'

export function getUrlImageByTemplate (image: ImageView, template: ImageTemplate): string {
  if (!Array.isArray(image.divisionByTemplates)) return ''
  const urls = image.divisionByTemplates.map((i) => ({ url: i.url, template: i.template }))

  const foundUrl = urls.find(
    (i) => i.template.includes(template) || i.template.includes('original')
  )
  const url = foundUrl ? foundUrl.url : urls[0].url

  return REST_API_URL + url || ''
}
