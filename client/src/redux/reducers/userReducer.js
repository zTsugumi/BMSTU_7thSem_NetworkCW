import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE,
  SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
} from '../actions/allTypes';

const users = (state = {
  isLoading: false,
  isAuth: false,
  isAdmin: false,
  creds: null,
  errMess: null
}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        isAdmin: false,
        creds: action.payload,
        errMess: null
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isAdmin: false,
        creds: null,
        errMess: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isAdmin: false,
        creds: null,
        errMess: action.payload
      };

    case SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        isAdmin: false,
        creds: action.payload,
        errMess: null
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isAdmin: action.isAdmin,
        creds: null,
        errMess: null
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isAdmin: false,
        creds: null,
        errMess: action.payload
      };

    case SIGNOUT_REQUEST:
      return { ...state, isLoading: true }
    case SIGNOUT_SUCCESS:
      return { ...state, isLoading: false };
    case SIGNOUT_FAILURE:
      return { ...state, isLoading: false, signoutFail: action.payload };

    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        isAdmin: false,
        creds: null,
        errMess: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        isAdmin: action.payload.isAdmin,
        creds: null,
        errMess: null
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isAdmin: false,
        creds: null,
        errMess: action.payload
      };

    default:
      return state;
  }
}

export default users;