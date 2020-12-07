import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE,
  SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
} from './allTypes';
import { SERVER_USER } from '../../shared/config';

/****************************************** SIGNUP ******************************************/
const signupRequest = (creds) => {
  return {
    type: SIGNUP_REQUEST,
    payload: creds
  }
}

const signupSuccess = (response) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: response
  }
}

const signupError = (message) => {
  return {
    type: SIGNUP_FAILURE,
    payload: message
  }
}

const signupUser = (creds) => (dispatch) => {
  dispatch(signupRequest(creds));

  return fetch(`${SERVER_USER}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
    .then(
      response => {
        if (response.ok) {      // If receive response from server
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => {
      if (response.success) {   // If server successfully create new user
        dispatch(signupSuccess(response));
      }
      else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(signupError(error.message)));
};

/****************************************** SIGNIN ******************************************/
const signinRequest = (creds) => {
  return {
    type: SIGNIN_REQUEST,
    payload: creds
  }
}

const signinSuccess = (response) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: response
  }
}

const signinError = (message) => {
  return {
    type: SIGNIN_FAILURE,
    payload: message
  }
}

const signinUser = (creds) => (dispatch) => {
  dispatch(signinRequest(creds));

  return fetch(`${SERVER_USER}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('creds', JSON.stringify(creds));
        if (response.isAdmin)
          localStorage.setItem('isAdmin', response.isAdmin);

        dispatch(signinSuccess(response));
      }
      else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(signinError(error.message)));
};

/****************************************** SIGNOUT *****************************************/
const signoutRequest = () => {
  return {
    type: SIGNOUT_REQUEST
  }
}

const signoutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS
  }
}

const signoutError = (message) => {
  return {
    type: SIGNOUT_FAILURE,
    payload: message
  }
}

const signoutUser = () => (dispatch) => {
  dispatch(signoutRequest());

  localStorage.removeItem('token');
  localStorage.removeItem('creds');
  localStorage.removeItem('isAdmin');

  return fetch(`${SERVER_USER}/signout`)
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(signoutSuccess(response));
      }
      else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(signoutError(error.message)));
}

/******************************************* AUTH *******************************************/
const authRequest = () => {
  return {
    type: AUTH_REQUEST
  }
}

const authSuccess = () => {
  return {
    type: AUTH_SUCCESS
  }
}

const authError = (message) => {
  return {
    type: AUTH_FAILURE,
    payload: message
  }
}

const authUser = () => (dispatch) => {
  dispatch(authRequest());

  return fetch(`${SERVER_USER}/auth`)
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(authSuccess(response));
      }
      else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(authError(error.message)));
}

const userActions = {
  signupUser,
  signinUser,
  signoutUser,
  authUser,
}

export default userActions;