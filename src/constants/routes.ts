
export const ADMIN = 'admin'
export const LOGIN = 'login'
export const HOMEPAGE = 'homepage'
export const PROJECTS = 'projects'
export const PROJECT = 'projects/:projectId'
export const SKILLS = 'skills'
export const SKILL = 'skills/:skillId'
export const TIME_STAMPS = 'time-stamps'
export const TIME_STAMP = 'time-stamps/:timeStampId'
export const SOCIAL_MEDIA = 'social-media'
export const SOCIAL_MEDIA_LINK = 'social-media/:socialMediaId'
export const GALLERY = 'gallery'

export function pathJoin (...arg: (string | number)[]): string {
  return '/' + arg.reduce((previousValue: string | number, currentValue: string | number) => previousValue + '/' + currentValue)
}
