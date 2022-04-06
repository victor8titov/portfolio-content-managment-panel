import { ErrorResponse } from '../api/index.types'

export type ErrorInReject = {
  status: number,
  messages: ErrorResponse[]
}

export type ErrorSerializable = {
  status?: number | null
  messages: string[]
}
