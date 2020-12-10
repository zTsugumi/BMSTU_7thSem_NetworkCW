import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import HomePage from './views/HomePage/HomePage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import AllActions from '../redux/actions/allActions';


function Main() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user);

  const signinUser = (creds) => dispatch(AllActions.UserActions.signinUser(creds));
  const signupUser = (creds) => dispatch(AllActions.UserActions.signupUser(creds));
  const signoutUser = () => dispatch(AllActions.UserActions.signoutUser());

  useEffect(() => {
    dispatch(AllActions.UserActions.authUser());
  }, [dispatch])

  const AuthRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={(props) => (
        users.creds
          ? <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
          : <Component {...props} />
      )}
      />
    );
  }

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar users={users} signoutUser={signoutUser} />
      <div className='content_wrapper' style={{ paddingTop: '50px', minHeight: 'calc(80vh - 50px)' }}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <AuthRoute exact path='/signin' component={() =>
            <LoginPage users={users} signinUser={signinUser} />} />
          <AuthRoute exact path='/signup' component={() =>
            <RegisterPage users={users} signupUser={signupUser} />} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default withRouter(Main);