import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import './Navbar.css';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';

function NavBar(props) {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className='menu'>
      <div className='menu__logo'>
        <a href='/'>Logo</a>
      </div>
      <div className='menu__container'>
        <div className='menu_left'>
          <LeftMenu mode='horizontal' />
        </div>
        <div className='menu_right'>
          <RightMenu mode='horizontal' users={props.users} signoutUser={props.signoutUser} />
        </div>
        <Button
          className='menu__mobile-button'
          type='primary'
          onClick={showDrawer}
        >
          <AlignRightOutlined />
        </Button>
        <Drawer
          title='Basic Drawer'
          placement='right'
          className='menu_drawer'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode='inline' />
          <RightMenu mode='inline' users={props.users} signoutUser={props.signoutUser} />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar;