import React, { FC } from 'react'
import { Skeleton } from 'antd'

type Props = {
  component: React.FC
}

const Suspense:FC<Props> = (props) => {
  const { component: Component } = props

  const Fallback: FC = () => <Skeleton />

  return (
    <React.Suspense fallback={<Fallback />}>
      <Component />
    </React.Suspense>
  )
}

export default Suspense
