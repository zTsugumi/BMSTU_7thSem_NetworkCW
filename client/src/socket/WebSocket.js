import React, { useEffect, useState } from 'react';
import WebSocketContext from './WebSocketContext';
import io from 'socket.io-client';
import { SERVER } from '../shared/config';
import { useDispatch } from 'react-redux';
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
        dispatch(AllActions.ChatActions.chatPost(msg));
      });
    }
  }, [socket, dispatch]);


  const sendMessage = (msg) => {
    socket.emit('event://send-message', msg);
  }

  return (
    <WebSocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  )
}