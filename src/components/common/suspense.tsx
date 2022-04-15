import React, { FC } from 'react'
import { Skeleton } from 'antd'
import Text from 'antd/lib/typography/Text'

type Props = {
  component: React.FC
}

const Suspense:FC<Props> = (props) => {
  const { component: Component } = props

  const Fallback: FC = () => <>
    <Text>Need some time to load the module. </Text>
    <Text>Wait, please...</Text>
    <Skeleton />
    </>

  return (
    <React.Suspense fallback={<Fallback />}>
      <Component />
    </React.Suspense>
  )
}

export default Suspense
