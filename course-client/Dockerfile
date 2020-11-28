FROM node:12-alpine
WORKDIR /course-client
COPY package*.json /course-client/
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "npm", "start" ]
