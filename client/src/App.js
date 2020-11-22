import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'core-js';

import React from 'react';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
