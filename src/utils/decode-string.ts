import { decode } from 'html-entities'
import { Language, ObjectWithLanguage } from '../types/common'

export function decodeStringInObjectWithLanguage (value: ObjectWithLanguage | undefined | null): ObjectWithLanguage | null {
  if (!value) return null

  const result: { [key: string]: string } = {}
  Object.keys(value).forEach((key: string) => {
    result[key] = decode(value[key as Language])
  })

  return result as ObjectWithLanguage
}
