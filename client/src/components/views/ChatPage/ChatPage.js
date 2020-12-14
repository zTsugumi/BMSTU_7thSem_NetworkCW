import React, { useEffect, useState, useRef } from 'react';
import { Typography, Row, Col, Input, Button } from 'antd';
import { MessageOutlined, UploadOutlined, EnterOutlined } from '@ant-design/icons';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import ChatCard from './Sections/ChatCard';
import './ChatPage.css';

import { SERVER_CHAT } from '../../../shared/config';

const { Title } = Typography;

function ChatPage(props) {
  const [chatMessage, setChatMessage] = useState('');
  const { user, chat, ws } = props;
  let messageEnd = useRef();

  useEffect(() => {
    if (messageEnd.current)
      messageEnd.current.scrollIntoView({});
  }, [messageEnd]);

  const handleSubmitChat = () => {
    if (!user.creds) {
      return alert('Please Log in first');
    }

    var message = {
      content: chatMessage,
      email: user.creds.email,
      atTime: moment(),
      type: "Text"
    }

    ws.sendMessage(message);

    setChatMessage('');
  }

  const handleOnDrop = (files) => {
    if (!user.creds) {
      return alert('Please Log in first');
    }

    var formData = new FormData();
    formData.append("file", files[0]);
    fetch(`${SERVER_CHAT}/upload`, {
      method: 'POST',
      body: formData
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
        if (response.success) {
          // Send new image/video to all clients
          var newFile = {
            content: response.url,
            email: user.creds.email,
            atTime: moment(),
            type: "VideoImage"
          }

          ws.sendMessage(newFile);
        }
        else {
          var error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div className='app'>
      <Title level={2}>Real Time Chat</Title>
      <Row className='chatbox'>
        {(chat && chat.chats)
          ? chat.chats.map(
            (chat) => (
              <ChatCard key={chat._id}  {...chat} />
            ))
          : null
        }
        <div ref={messageEnd}
          style={{ float: 'left', clear: 'both' }}
        />
      </Row>
      <Row className='chatbar' justify='center'>
        <Col span={18}>
          <Input
            id='message'
            prefix={<MessageOutlined className='chat__icon_color' />}
            placeholder="Let's start chatting"
            type='text'
            value={chatMessage}
            onChange={(event) => setChatMessage(event.target.value)}
          />
        </Col>
        <Col>
          <Dropzone onDrop={acceptedFiles => handleOnDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Button>
                    <UploadOutlined />
                  </Button>
                </div>
              </section>
            )}
          </Dropzone>
        </Col>
        <Col span={2}>
          <Button className='chat__button' type='primary'
            onClick={handleSubmitChat} htmlType='submit'>
            <EnterOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ChatPage;