import {
  CHAT_REQUEST, CHAT_SUCCESS, CHAT_FAILURE,
  CHAT_POST
} from '../actions/allTypes';

const chats = (state = {
  isLoading: true,
  chats: null,
}, action) => {
  switch (action.type) {
    case CHAT_REQUEST:
      return {
        ...state,
        isLoading: true,
        chats: null,
      }
    case CHAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        chats: action.payload,
      }
    case CHAT_FAILURE:
      return {
        ...state,
        isLoading: false,
        chats: action.payload,
      }

    case CHAT_POST:
      return {
        ...state,
        chats: state.chats.concat(action.payload)
      }
    default:
      return state;
  }
}

export default chats;