//SERVER ROUTES
export const SERVER_USER = process.env["NODE_ENV"] === "development"
  ? 'http://localhost:3000/api/users'
  : 'http://localhost/api/users';
