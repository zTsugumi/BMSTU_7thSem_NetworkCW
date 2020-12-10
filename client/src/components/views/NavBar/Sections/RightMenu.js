/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AllActions from '../../../../redux/actions/allActions';

function RightMenu(props) {
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(AllActions.UserActions.signoutUser());
  };

  if (props.users.creds !== null && props.users.creds !== false) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='logout'>
          <a onClick={signoutHandler}>Sign out</a>
        </Menu.Item>
      </Menu>
    )
  }
  else if (props.users.creds === false) {
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
  else
    return (<></>);
}

export default withRouter(RightMenu);