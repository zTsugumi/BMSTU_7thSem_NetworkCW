import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WebSocketContext } from '../../../socket/WebSocket';
import { createRoom, joinRoom } from '../../../redux/actions/roomActions';

function ChatRoom() {
  const [msgInput, setMsgInput] = useState("");

  const room = useSelector(state => state.room);
  const user = useSelector(state => state.user);
  // const chats = useSelector(state => state.chatLog);

  const ws = useContext(WebSocketContext);

  const sendMessage = () => {
    ws.sendMessage(room.id, {
      username: user.creds.email,
      message: msgInput
    });
  }

  return (
    <div>
      <h3>{room.name} ({room.id})</h3>
      <div className="room">
        <div className="history" style={{ width: "400px", border: "1px solid #ccc", height: "100px", textAlign: "left", padding: "10px", overflow: "scroll" }}>
          {room.chatLog
            ? room.chatLog.map((c, i) => (
              <div key={i}><i>{c.username}:</i> {c.message}</div>
            ))
            : null}
        </div>
        <div className="control">
          <input type="text" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

function RoomPage() {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const currentRoom = useSelector(state => state.room);

  const dispatch = useDispatch();

  return (
    <div className='app'>
      {!currentRoom.room &&
        <div className="create">
          <div>
            <span>Create new room</span>
            <input type="text"
              placeholder="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)} />
            <button onClick={() => dispatch(createRoom(roomName))}>Create</button>
          </div>
          <div>
            <span>Join existing room</span>
            <input type="text" placeholder="Room code" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <button onClick={() => dispatch(joinRoom(roomId))}>Join</button>
          </div>
        </div>
      }

      {currentRoom.room &&
        <ChatRoom />
      }
    </div>
  );
}

export default RoomPage;