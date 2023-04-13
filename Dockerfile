FROM node:12.2.0-alpine
WORKDIR app
COPY . .
RUN npm install
EXPOSE 3000
EXPOSE 27017
CMD ["npm","start"]
