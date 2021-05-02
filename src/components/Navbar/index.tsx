import React, { CSSProperties } from 'react'
import { Menu, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { AuthContextType, useAuthContext } from '../Auth/AuthProvider'
import { UserNameSpan, Wrapper } from './styled'
import { useHistory } from 'react-router'
import { paths } from '../App'

const MENU_ITEMS = Object.freeze({
  PROFILE: 'profile',
  LOGOUT: 'logout',
})

const MenuStyle: CSSProperties = {
  width: '150px',
}

const MenuItemStyle: CSSProperties = {
  textAlign: 'left',
}

const Navbar: React.FC = () => {
  const { user, logout } = useAuthContext() as AuthContextType
  const history = useHistory()

  const onClick = ({ key }: any) => {
    switch (key) {
      case MENU_ITEMS.PROFILE:
        history.push(paths.PROFILE)
        break
      case MENU_ITEMS.LOGOUT:
        logout()
        break
    }
  }

  const menu = (
    <Menu onClick={onClick} style={MenuStyle}>
      <Menu.Item key={MENU_ITEMS.PROFILE} style={MenuItemStyle}>
        Profile
      </Menu.Item>
      <Menu.Item key={MENU_ITEMS.LOGOUT} style={MenuItemStyle}>
        Logout
      </Menu.Item>
    </Menu>
  )

  if (!user) return null

  return (
    <Wrapper>
      <h3 onClick={() => history.push(paths.DASHBOARD)}>Site Checker</h3>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <UserOutlined />
          <UserNameSpan>{user.userName}</UserNameSpan>
        </a>
      </Dropdown>
    </Wrapper>
  )
}

export default Navbar
