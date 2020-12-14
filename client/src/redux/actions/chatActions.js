import {
  CHAT_REQUEST, CHAT_SUCCESS, CHAT_FAILURE,
  CHAT_POST
} from './allTypes';
import { DoDecrypt } from '../../encryption/aes';
import { SERVER_CHAT } from '../../shared/config';

/****************************************** GET ******************************************/
const chatRequest = () => {
  return {
    type: CHAT_REQUEST
  }
}

const chatSuccess = (chats) => {
  return {
    type: CHAT_SUCCESS,
    payload: chats
  }
}

const chatError = (message) => {
  return {
    type: CHAT_FAILURE,
    payload: message
  }
}

const chatGet = () => (dispatch) => {
  dispatch(chatRequest());

  return fetch(`${SERVER_CHAT}`, {
    method: 'GET',
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
      })
    .then(response => response.json())
    .then(response => {
      const allMsg = response.map(msg => {
        return {
          _id: msg._id,
          message: DoDecrypt(msg.message),
          sender: msg.sender,
          type: msg.type,
          atTime: msg.atTime
        };
      })

      dispatch(chatSuccess(allMsg));
    })
    .catch(error => dispatch(chatError(error.message)));
}

/****************************************** POST *****************************************/
const chatPost = (msg) => {
  return {
    type: CHAT_POST,
    payload: msg
  }
}

const chatActions = {
  chatGet,
  chatPost,
}

export default chatActions;