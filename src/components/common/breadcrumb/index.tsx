import React, { FC, useMemo } from 'react'
import { Breadcrumb as AntBreadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import './styles.scss'

const Breadcrumb: FC = () => {
  const { pathname } = useLocation()
  const breadcrumb = useMemo(() => pathname.split('/').slice(0, -1).filter(i => i), [pathname])
  const lastPoint = useMemo(() => pathname.split('/').pop(), [pathname])
  let path = ''

  return (
    <AntBreadcrumb className='breadcrumb'>
      {breadcrumb.map(item => {
        path += `/${item}`

        return (
          <AntBreadcrumb.Item key={item}>
            <Link to={path}>
              {item}
            </Link>
          </AntBreadcrumb.Item>
        )
      })}
      <AntBreadcrumb.Item>{lastPoint}</AntBreadcrumb.Item>
    </AntBreadcrumb>
  )
}

export default Breadcrumb
