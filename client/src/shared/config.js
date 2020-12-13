//SERVER ROUTES
export const SERVER_USER = process.env['NODE_ENV'] === 'development'
  ? 'http://localhost:3000/api/users'
  : 'http://localhost/api/users';

export const SERVER_CHAT = process.env['NODE_ENV'] === 'development'
  ? 'http://localhost:3000/api/chat'
  : 'http://localhost/api/chat';

export const SERVER = process.env['NODE_ENV'] === 'development'
  ? 'http://localhost:3000'
  : 'http://localhost';
