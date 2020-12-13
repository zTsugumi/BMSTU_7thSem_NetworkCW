import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import HomePage from './views/HomePage/HomePage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import ChatPage from './views/ChatPage/ChatPage';
import AllActions from '../redux/actions/allActions';
import io from 'socket.io-client';
import { SERVER } from '../shared/config';

function Main() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const chats = useSelector(state => state.chat);

  const signinUser = (creds) => dispatch(AllActions.UserActions.signinUser(creds));
  const signupUser = (creds) => dispatch(AllActions.UserActions.signupUser(creds));
  const signoutUser = () => dispatch(AllActions.UserActions.signoutUser());
  const chatPost = (msg) => dispatch(AllActions.ChatActions.chatPost(msg));

  useEffect(() => {
    dispatch(AllActions.UserActions.authUser());
    dispatch(AllActions.ChatActions.chatGet());
  }, [dispatch])

  const AuthRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={(props) => (
        user.creds
          ? <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
          : <Component {...props} />
      )}
      />
    );
  }

  const socket = io(SERVER);
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar user={user} signoutUser={signoutUser} />
      <div className='content_wrapper' style={{ paddingTop: '50px', minHeight: 'calc(80vh - 50px)' }}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <AuthRoute exact path='/signin' component={() =>
            <LoginPage user={user} signinUser={signinUser} />} />
          <AuthRoute exact path='/signup' component={() =>
            <RegisterPage user={user} signupUser={signupUser} />} />
          <Route exact path="/chat" component={() =>
            <ChatPage user={user} chats={chats}
              chatPost={chatPost} socket={socket} />} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default withRouter(Main);