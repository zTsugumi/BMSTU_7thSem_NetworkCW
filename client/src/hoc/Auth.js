import React, { useEffect } from 'react';
import AllActions from '../redux/actions/allActions';
import { useSelector, useDispatch } from 'react-redux';

function Auth(ComposedClass, reload, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(AllActions.UserActions.authUser())
        .then(
          async (res) => {
            if (await !res.payload.isAuth) {
              if (reload) {
                props.history.push('/register_login')
              }
            } else {
              if (adminRoute && !res.payload.isAdmin) {
                props.history.push('/')
              }
              else {
                if (reload === false) {
                  props.history.push('/')
                }
              }
            }
          })
    }, [dispatch, props.history, user.googleAuth])

    return (
      <ComposedClass {...props} user={user} />
    )
  }
  return AuthenticationCheck
}

export default Auth;