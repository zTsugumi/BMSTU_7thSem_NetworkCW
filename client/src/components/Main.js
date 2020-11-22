import React, { Suspense } from 'react';
import { withRouter } from 'react-router-dom';

function Main() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <p>Something</p>
    </Suspense>
  )
}

export default withRouter(Main);