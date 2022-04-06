import { configureStore } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ErrorBodyResponse } from '../api/index.types'
import rootReducer from '../store/slices'
import { ErrorSerializable } from './index.types'

console.log('check', (NODE_ENV))

const store = configureStore({
  reducer: rootReducer,
  devTools: NODE_ENV !== 'production'
})

export type State = ReturnType<typeof rootReducer>

export function errorSerialization (error: any): ErrorSerializable {
  const value: ErrorSerializable = {
    messages: []
  }

  if (error.isAxiosError) {
    const { response } = error as AxiosError<ErrorBodyResponse>
    if (!response) return value

    const { status, data: { errors } } = response
    value.status = status
    value.messages = errors?.map(i => `${i.message} ${i.source || ''}`) || []

    return value
  }

  if (error instanceof Error) {
    value.messages.push(error.message)

    return value
  }

  if (typeof error === 'string' && NODE_ENV === 'development') {
    value.messages.push(error)
  }

  return value
}

export default store
