import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Auth from '../hoc/Auth';
import NavBar from './views/NavBar/NavBar';
import HomePage from './views/HomePage/HomePage';
import Footer from './views/Footer/Footer';
import LoginPage from './views/LoginPage/LoginPage';

function Main() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className='content_wrapper' style={{ paddingTop: '50px', minHeight: 'calc(80vh - 50px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(HomePage, null)} />
          <Route exact path='/signin' component={Auth(LoginPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default withRouter(Main);