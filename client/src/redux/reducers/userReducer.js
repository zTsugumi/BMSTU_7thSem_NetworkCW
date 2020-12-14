import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE,
  SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE,
} from '../actions/allTypes';

const users = (state = {
  isLoading: true,
  creds: null,
  errMess: null,
  regSuccess: null,
  logSuccess: null,
}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        creds: null,
        regSuccess: false,
        logSuccess: null,
        errMess: null
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        creds: null,
        regSuccess: true,
        logSuccess: null,
        errMess: null
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        creds: null,
        regSuccess: false,
        logSuccess: null,
        errMess: action.payload
      };

    case SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        creds: null,
        regSuccess: null,
        logSuccess: false,
        errMess: null
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        creds: null,
        regSuccess: null,
        logSuccess: true,
        errMess: null
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        creds: null,
        regSuccess: null,
        logSuccess: false,
        errMess: action.payload
      };

    case SIGNOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        creds: null,
        regSuccess: null,
        logSuccess: null,
        errMess: null
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        creds: null,
        regSuccess: null,
        logSuccess: null,
        errMess: null
      };
    case SIGNOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        creds: null,
        regSuccess: null,
        logSuccess: null,
        errMess: action.payload
      };

    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        creds: null,
        regSuccess: null,
        logSuccess: null,
        errMess: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        creds: action.payload,
        regSuccess: null,
        logSuccess: null,
        errMess: null
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
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