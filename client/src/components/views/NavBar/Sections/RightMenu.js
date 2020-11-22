/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import AllActions from '../../../../redux/actions/allActions';

function RightMenu(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(AllActions.UserActions.signoutUser())
      .then(
        (response) => {
          console.log(response);
        }
      )
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/signin">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/signup">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={signoutHandler}>Signout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);