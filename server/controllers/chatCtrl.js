const ChatRepo = require('../repo/chatRepo');
const UserRepo = require('../repo/userRepo');
const utils = require('../helpers/utils');

async function findAll(req, res) {
  try {
    ChatRepo.findAll()
      .then((chats) => {
        const newChats = chats.map((chat) => {
          return {
            _id: chat._id,
            message: chat.message,
            sender: {
              firstname: chat.sender.firstname,
              lastname: chat.sender.lastname,
              role: chat.sender.role,
              email: chat.sender.email,
              image: chat.sender.image
            },
            type: chat.type,
            atTime: chat.atTime
          };
        });

        utils.sendJsonResponse(res, 200, newChats);
      })
      .catch((err) => utils.sendJsonResponse(res, 500, err));
  }
  catch (err) {
    console.log(err);
  };
}

/**
 * Return the new chat
 */
async function insert(chat) {
  return new Promise((resolve, reject) => {
    try {
      UserRepo.findOne({ email: chat.email })
        .then(
          (user) => {
            if (newChat !== null) {
              var newChat = {
                message: chat.content,
                sender: user._id,
                type: chat.type,
                atTime: chat.atTime
              };

              ChatRepo.create(newChat)
                .then(
                  (chat) => {
                    const newChat = {
                      _id: chat._id,
                      message: chat.message,
                      sender: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        role: user.role,
                        email: user.email,
                        image: user.image
                      },
                      type: chat.type,
                      atTime: chat.atTime
                    };

                    resolve(newChat);
                  }
                )
            }
            else
              reject(null);
          }
        )
        .catch(err => reject(err)) // WIP
    } catch (err) {
      reject(err);                 // WIP
    }
  });
}

module.exports = {
  findAll,
  insert
}