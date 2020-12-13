const Chat = require('../models/chat');

function findAll() {
  return Chat.find()
    .populate('sender')
    .exec();
}

async function create(chat) {
  let newChat = await Chat.create(chat);
  return newChat.populate('sender').execPopulate();
}

module.exports = {
  findAll,
  create
}