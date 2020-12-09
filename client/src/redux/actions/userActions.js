import {
  SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_SUCCESS, SIGNIN_FAILURE,
  SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
  AUTH_SUCCESS, AUTH_FAILURE,
} from './allTypes';
import { SERVER_USER } from '../../shared/config';

/****************************************** SIGNUP ******************************************/
const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS
  }
}

const signupError = (message) => {
  return {
    type: SIGNUP_FAILURE,
    payload: message
  }
}

const signupUser = (creds) => async (dispatch) => {
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
        dispatch(signupSuccess());
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
const signinSuccess = () => {
  return {
    type: SIGNIN_SUCCESS
  }
}

const signinError = (message) => {
  return {
    type: SIGNIN_FAILURE,
    payload: message
  }
}

const signinUser = (creds) => (dispatch) => {
  return fetch(`${SERVER_USER}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
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
        dispatch(signinSuccess());
      }
      else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .then(() => dispatch(authUser()))
    .catch(error => dispatch(signinError(error.message)));
};

/****************************************** SIGNOUT *****************************************/
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
const authSuccess = (creds) => {
  return {
    type: AUTH_SUCCESS,
    payload: creds.isAdmin
  }
}

const authError = (message) => {
  return {
    type: AUTH_FAILURE,
    payload: message
  }
}

const authUser = () => (dispatch) => {
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