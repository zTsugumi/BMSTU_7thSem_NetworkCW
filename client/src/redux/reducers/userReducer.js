import {
  SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_SUCCESS, SIGNIN_FAILURE,
  SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
  AUTH_SUCCESS, AUTH_FAILURE,
} from '../actions/allTypes';

const users = (state = {
  isLoading: false,
  isAuth: false,
  isAdmin: false,
  creds: null,
  errMess: null,
  regSuccess: null
}, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: true,
        errMess: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: false,
        errMess: action.payload
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isAdmin: action.payload,
        creds: null,
        regSuccess: null,
        errMess: null
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: null,
        errMess: action.payload
      };

    case SIGNOUT_SUCCESS:
      return { ...state, isLoading: false };
    case SIGNOUT_FAILURE:
      return { ...state, isLoading: false, signoutFail: action.payload };

    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isAdmin: action.payload,
        creds: null,
        regSuccess: null,
        errMess: null
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isAdmin: false,
        creds: null,
        regSuccess: null,
        errMess: action.payload
      };

    default:
      return state;
  }
}

export default users;