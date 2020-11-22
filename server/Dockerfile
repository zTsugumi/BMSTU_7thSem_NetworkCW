# pull official base image
FROM node:15.2.1-alpine3.10

# create app directory
RUN mkdir -p /app/server
WORKDIR /app/server

ENV PATH /app/server/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]