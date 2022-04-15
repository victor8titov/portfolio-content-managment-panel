import React, { FC, useCallback, useMemo } from 'react'
import { Affix, Button, Grid, Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons'

import useLogout from './hooks/logout'
import './styles.scss'

const { Header: AntHeader } = Layout
const { useBreakpoint } = Grid

type Props = {
  isCollapsed?: boolean
  onCollapsed?: (flag: boolean) => void
}
const Header: FC<Props> = ({ isCollapsed = true, onCollapsed }) => {
  const screens = useBreakpoint()
  const isMobile = useMemo(() => !screens.md, [screens])
  const { onLogout } = useLogout()

  const handleTrigger = useCallback(() => {
    if (onCollapsed) onCollapsed(!isCollapsed)
  }, [onCollapsed, isCollapsed])

  return (
    <AntHeader
      className="header">
        {isMobile
          ? <Affix >
              <div className='trigger' onClick={handleTrigger}>
                {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </Affix>
          : null
        }
        <div className='header__right-bar'>
          <Button className='header__logout' onClick={onLogout}>
            Log out <LogoutOutlined />
          </Button>

        </div>
      </AntHeader>
  )
}

export default Header
