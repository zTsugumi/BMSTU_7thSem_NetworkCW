/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { Loading } from '../../Loading/Loading';

function RightMenu(props) {
  const [formLoading, setFormLoading] = useState(props.users.isLoading);

  // Effect for loading
  useEffect(() => {
    setFormLoading(props.users.isLoading);

    return (() => {
      setFormLoading(props.users.isLoading);
    });
  }, [props.users.isLoading]);

  if (formLoading) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='loading'>
          <Loading />
        </Menu.Item>
      </Menu>
    )
  }
  else {
    if (props.users.creds) {
      return (
        <Menu mode={props.mode}>
          <Menu.Item key='logout'>
            <a onClick={() => props.signoutUser()}>Sign out</a>
          </Menu.Item>
        </Menu>
      )
    }
    else {
      return (
        <Menu mode={props.mode}>
          <Menu.Item key='mail'>
            <a href='/signin'>Sign in</a>
          </Menu.Item>
          <Menu.Item key='app'>
            <a href='/signup'>Sign up</a>
          </Menu.Item>
        </Menu>
      )
    }
  }
}

export default withRouter(RightMenu);