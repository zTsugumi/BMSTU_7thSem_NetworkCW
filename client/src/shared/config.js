//SERVER ROUTES
export const SERVER_USER = process.env['NODE_ENV'] === 'development'
  ? 'https://localhost:3443/api/users'
  : 'https://localhost/api/users';

export const SERVER_CHAT = process.env['NODE_ENV'] === 'development'
  ? 'https://localhost:3443/api/chat'
  : 'https://localhost/api/chat';

export const SERVER = process.env['NODE_ENV'] === 'development'
  ? 'https://localhost:3443'
  : 'https://localhost';