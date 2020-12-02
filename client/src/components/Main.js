import React, { Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Auth from '../hoc/Auth';
import NavBar from './views/NavBar/NavBar';
import HomePage from './views/HomePage/HomePage';
import Footer from './views/Footer/Footer';

function Main() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className="content_wrapper" style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default withRouter(Main);