import React from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';
import { SERVER } from '../../../../shared/config';

function RenderFile({ message }) {
  var ext = message.substring(message.length - 3, message.length);

  if (message.substring(0, 7) === 'upload\\') {
    switch (ext) {
      case 'mkv':
      case 'mp4':
        return (
          <video
            style={{ maxWidth: '50%' }}
            src={`${SERVER}/${message}`}
            alt='video' type='video/mp4' controls
          />
        );
      case 'png':
      case 'jpg':
        return (
          <img
            style={{ maxWidth: '50%' }}
            src={`${SERVER}/${message}`} alt='img'
          />
        );
      default:
        return (
          <a href={`${SERVER}/${message}`}>{message.slice(7 - message.length)}</a>
        );
    }
  }
  else {
    return (
      <p>
        {message}
      </p>
    )
  }
}

function ChatCard(props) {
  const { sender, message, atTime } = props;

  return (
    <div style={{ width: '100%' }}>
      <Comment
        author={`${sender.firstname} ${sender.lastname}`}
        avatar={
          <Avatar
            src={sender.image} alt={sender.name}
          />
        }
        content={<RenderFile message={message} />}
        datetime={
          <Tooltip title={moment(atTime).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(atTime).fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  )
}

export default ChatCard;

