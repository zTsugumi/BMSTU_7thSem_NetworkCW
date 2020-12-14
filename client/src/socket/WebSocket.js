import React, { useEffect, useState } from 'react';
import WebSocketContext from './WebSocketContext';
import io from 'socket.io-client';
import { SERVER } from '../shared/config';
import { useDispatch } from 'react-redux';
import { DoEncrypt, DoDecrypt } from '../encryption/aes';
import AllActions from '../redux/actions/allActions';

export default ({ children }) => {
  const [socket, setSocket] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setSocket(io.connect(SERVER));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('event://get-message', (msg) => {
        var DecryptMsg = {
          _id: msg._id,
          message: DoDecrypt(msg.message),
          sender: msg.sender,
          type: msg.type,
          atTime: msg.atTime
        }

        dispatch(AllActions.ChatActions.chatPost(DecryptMsg));
      });
    }
  }, [socket, dispatch]);


  const sendMessage = (msg) => {
    var EncryptMsg = {
      content: DoEncrypt(msg.content),
      email: msg.email,
      atTime: msg.atTime,
      type: msg.type
    }
    socket.emit('event://send-message', EncryptMsg);
  }

  return (
    <WebSocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  )
}