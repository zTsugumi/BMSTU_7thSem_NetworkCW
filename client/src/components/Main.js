import React, { Suspense } from 'react';
import { Route, withRouter } from 'react-router-dom';
import NavBar from './views/NavBar/NavBar';

function Main() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <p>Something</p>
    </Suspense>
  )
}

export default withRouter(Main);