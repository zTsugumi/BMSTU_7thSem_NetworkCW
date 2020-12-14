# pull official base image
FROM node:15.2.1-alpine3.10 as react_build

# create app directory
RUN mkdir -p /app/client
WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH

# add app
COPY . ./

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# avoid bug from react
#RUN npm install react-scripts@3.0.1 -g --silent
#RUN npm run start

# start app
CMD ["npm", "run", "start"]