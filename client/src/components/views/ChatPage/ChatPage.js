import React, { useEffect, useRef, useState } from 'react';
import { Typography, Row, Col, Input, Button } from 'antd';
import { MessageOutlined, UploadOutlined, EnterOutlined } from '@ant-design/icons';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import ChatCard from './Sections/ChatCard';
import './ChatPage.css';

const { Title } = Typography;

function ChatPage(props) {
  const [chatMessage, setChatMessage] = useState('');
  const { user, chats, chatPost, socket } = props;
  let mounted = useRef();
  let messageEnd = useRef();

  useEffect(() => {
    if (!mounted.current) {   // do componentDidMount logic
      mounted.current = true;

      socket.on("server to client", msgFromServer => {
        chatPost(msgFromServer);
      });
    }
  });

  useEffect(() => {
    if (messageEnd.current)
      messageEnd.current.scrollIntoView({
        behavior: "smooth"
      });
  }, [messageEnd]);

  const handleSubmitChat = () => {
    if (!user.creds) {
      return alert('Please Log in first');
    }

    var message = {
      content: chatMessage,
      user: user.creds,
      atTime: moment(),
      type: "Text"
    }

    socket.emit("client to server", message);

    setChatMessage('');
  }

  const handleOnDrop = (files) => {
    console.log(files);

    if (!user.creds) {
      return alert('Please Log in first');
    }

    // let formData = new FormData;

    // const config = {
    //   header: { 'content-type': 'multipart/form-data' }
    // }

    // formData.append("file", files[0])

    // Axios.post('api/chat/uploadfiles', formData, config)
    //   .then(response => {
    //     if (response.data.success) {
    //       let chatMessage = response.data.url;
    //       let userId = this.props.user.userData._id
    //       let userName = this.props.user.userData.name;
    //       let userImage = this.props.user.userData.image;
    //       let nowTime = moment();
    //       let type = "VideoOrImage"

    //       this.socket.emit("Input Chat Message", {
    //         chatMessage,
    //         userId,
    //         userName,
    //         userImage,
    //         nowTime,
    //         type
    //       });
    //     }
    //   })
  }

  return (
    <div className='app'>
      <Title level={2}>Real Time Chat</Title>
      <Row className='chatbox'>
        {(chats && chats.chats)
          ? chats.chats.map(
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