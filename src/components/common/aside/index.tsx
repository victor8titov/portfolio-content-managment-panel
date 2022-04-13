import React, { FC, useState } from 'react'
import { Menu, Layout } from 'antd'

import './styles.scss'
import { NavLink } from 'react-router-dom'

const { Sider } = Layout

const Link: FC<{ to: string, children: React.ReactNode, onActive: () => void}> =
({ to, onActive, children }) => (
    <NavLink to={to}>
      {({ isActive }) => {
        if (isActive) onActive()
        return children
      }}
    </NavLink>
)

const Aside: FC = () => {
  const [key, setKey] = useState<string>('homepage')

  return (
    <Sider trigger={null} className="sidebar">
      <div className="logo" />

      <Menu theme="dark" mode="inline" defaultSelectedKeys={[key]} selectedKeys={[key]}>
        <Menu.Item key="homepage">
          <Link to="/homepage" onActive={() => setKey('homepage')}>
            Home Page
          </Link>
        </Menu.Item>

        <Menu.Item key="projects">
          <Link to="/projects" onActive={() => setKey('projects')}>
            Projects
          </Link>
        </Menu.Item>

        <Menu.Item key="skills">
          <Link to="/skills" onActive={() => setKey('skills')}>
            Skills
          </Link>
        </Menu.Item>

        <Menu.Item key="time-stamps">
          <Link to="/time-stamps" onActive={() => setKey('time-stamps')}>
            Time Stamp
          </Link>
        </Menu.Item>

        <Menu.Item key="gallery">
          <Link to="/gallery" onActive={() => setKey('gallery')}>
            Gallery
          </Link>
        </Menu.Item>

      </Menu>
    </Sider>
  )
}

export default Aside
