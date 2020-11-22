import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE,
  SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
  AUTH_USER,
} from '../actions/allTypes';

export default function (state = {
  isLoading: false
}, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, isLoading: true, signupRequest: action.payload }
    case SIGNUP_SUCCESS:
      return { ...state, isLoading: false, signupSuccess: action.payload };
    case SIGNUP_FAILURE:
      return { ...state, isLoading: false, signupFail: action.payload };
      
    case SIGNIN_REQUEST:
      return { ...state, isLoading: true, signinRequest: action.payload }
    case SIGNIN_SUCCESS:
      return { ...state, isLoading: false, signinSuccess: action.payload };
    case SIGNIN_FAILURE:
      return { ...state, isLoading: false, signinFail: action.payload };

    case SIGNOUT_REQUEST:
      return { ...state, isLoading: true }
    case SIGNOUT_SUCCESS:
      return { ...state, isLoading: false };
    case SIGNOUT_FAILURE:
      return { ...state, isLoading: false, signoutFail: action.payload };

    default:
      return state;
  }
}