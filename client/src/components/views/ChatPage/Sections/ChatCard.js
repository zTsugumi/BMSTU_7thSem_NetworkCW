import React from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';
import { SERVER } from '../../../../shared/config';

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
        content={
          message.substring(0, 8) === "uploads/" ?      // video or image           
            message.substring(message.length - 3, message.length) === 'mp4' ?
              <video
                style={{ maxWidth: '200px' }}
                src={`${SERVER}/${message}`} alt="video"
                type="video/mp4" controls
              />
              :
              <img
                style={{ maxWidth: '200px' }}
                src={`http://localhost:5000/${message}`}
                alt="img"
              />
            :
            <p>
              {message}
            </p>
        }
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

