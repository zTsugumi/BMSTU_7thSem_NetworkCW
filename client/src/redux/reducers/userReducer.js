import {
  SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_SUCCESS, SIGNIN_FAILURE,
  SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
  AUTH_SUCCESS, AUTH_FAILURE,
} from '../actions/allTypes';

const users = (state = {
  isAuth: false,
  isAdmin: false,
  creds: null,
  errMess: null,
  regSuccess: null,
  logSuccess: null,
}, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: true,
        logSuccess: null,
        errMess: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: false,
        logSuccess: null,
        errMess: action.payload
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: null,
        logSuccess: true,
        errMess: null
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: null,
        logSuccess: false,
        errMess: action.payload
      };

    case SIGNOUT_SUCCESS:
      return { ...state, };
    case SIGNOUT_FAILURE:
      return { ...state, signoutFail: action.payload };

    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isAdmin: action.payload,
        creds: null,
        regSuccess: null,
        logSuccess: null,
        errMess: null
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: null,
        logSuccess: null,
        errMess: action.payload
      };

    default:
      return state;
  }
}

export default users;