import React, { FC, useCallback, useMemo, useState } from 'react'
import { Menu, Layout, Grid } from 'antd'

import './styles.scss'
import { NavLink } from 'react-router-dom'
import { ADMIN, GALLERY, HOMEPAGE, pathJoin, PROJECTS, SKILLS, SOCIAL_MEDIA, TIME_STAMPS } from '../../../constants/routes'

const { Sider } = Layout
const { useBreakpoint } = Grid

const Link: FC<{ to: string, children: React.ReactNode, onActive: () => void}> =
({ to, onActive, children }) => (
    <NavLink to={to}>
      {({ isActive }) => {
        if (isActive) onActive()
        return children
      }}
    </NavLink>
)

type Props = {
  onCollapsed?: (flag: boolean) => void
  isCollapsed?: boolean
}

const Aside: FC<Props> = ({ onCollapsed, isCollapsed }) => {
  const [key, setKey] = useState<string>('homepage')
  const screens = useBreakpoint()
  const isMobile = useMemo(() => !screens.md, [screens])

  const handleBreakpoint = useCallback((breakpoint: boolean) => {
    if (breakpoint) {
      if (onCollapsed) onCollapsed(true)
    } else {
      if (onCollapsed) onCollapsed(false)
    }
  }, [onCollapsed])

  const handleClickMenu = useCallback(() => {
    if (onCollapsed && isMobile) onCollapsed(true)
  }, [onCollapsed, isMobile])

  return (
    <Sider
      className="sidebar"
      trigger={null}
      theme={isMobile ? 'dark' : 'light'}
      collapsedWidth={0}
      collapsible
      collapsed={isCollapsed}
      breakpoint={'md'}
      onBreakpoint={handleBreakpoint}>
      <Menu
        theme={isMobile ? 'dark' : 'light'}
        className='sidebar__menu'
        mode="inline"
        defaultSelectedKeys={[key]}
        selectedKeys={[key]}
        onSelect={handleClickMenu}>
        <Menu.Item key="homepage">
          <Link to={pathJoin(ADMIN, HOMEPAGE)} onActive={() => setKey('homepage')}>
            Home Page
          </Link>
        </Menu.Item>

        <Menu.Item key="projects">
          <Link to={pathJoin(ADMIN, PROJECTS)} onActive={() => setKey('projects')}>
            Projects
          </Link>
        </Menu.Item>

        <Menu.Item key="skills">
          <Link to={pathJoin(ADMIN, SKILLS)} onActive={() => setKey('skills')}>
            Skills
          </Link>
        </Menu.Item>

        <Menu.Item key="time-stamps">
          <Link to={pathJoin(ADMIN, TIME_STAMPS)} onActive={() => setKey('time-stamps')}>
            Time Stamp
          </Link>
        </Menu.Item>

        <Menu.Item key="social-media">
          <Link to={pathJoin(ADMIN, SOCIAL_MEDIA)} onActive={() => setKey('social-media')}>
            Social Media Links
          </Link>
        </Menu.Item>

        <Menu.Item key="gallery">
          <Link to={pathJoin(ADMIN, GALLERY)} onActive={() => setKey('gallery')}>
            Gallery
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Aside
