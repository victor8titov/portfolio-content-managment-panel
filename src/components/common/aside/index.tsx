import React, { FC, useCallback, useMemo, useState } from 'react'
import { Menu, Layout, Grid } from 'antd'

import './styles.scss'
import { NavLink } from 'react-router-dom'

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
          <Link to="/admin/homepage" onActive={() => setKey('homepage')}>
            Home Page
          </Link>
        </Menu.Item>

        <Menu.Item key="projects">
          <Link to="/admin/projects" onActive={() => setKey('projects')}>
            Projects
          </Link>
        </Menu.Item>

        <Menu.Item key="skills">
          <Link to="/admin/skills" onActive={() => setKey('skills')}>
            Skills
          </Link>
        </Menu.Item>

        <Menu.Item key="time-stamps">
          <Link to="/admin/time-stamps" onActive={() => setKey('time-stamps')}>
            Time Stamp
          </Link>
        </Menu.Item>

        <Menu.Item key="social-media">
          <Link to="/admin/social-media" onActive={() => setKey('social-media')}>
            Social Media Links
          </Link>
        </Menu.Item>

        <Menu.Item key="gallery">
          <Link to="/admin/gallery" onActive={() => setKey('gallery')}>
            Gallery
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Aside
