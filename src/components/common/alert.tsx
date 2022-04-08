import { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message as antMessage } from 'antd'
import { State } from '../../store'
import { alertActions, AlertMessage } from '../../store/slices/alert'

const Alert: FC = () => {
  const dispatch = useDispatch()

  const currentMessage = useSelector((state: State) => state.alert.currentMessage)

  useEffect(() => {
    const show = ({ message, severity }: AlertMessage) => {
      if (!message) return

      if (severity === 'success') antMessage.success(message)
      if (severity === 'warning') antMessage.warning(message)
      if (severity === 'error') antMessage.error(message)
    }

    if (currentMessage) {
      show(currentMessage)
      dispatch(alertActions.pullMessage())
    }
  }, [currentMessage, dispatch])

  return null
}

export default Alert
