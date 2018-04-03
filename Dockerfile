FROM node:latest
WORKDIR /code
ADD package.json /code
RUN yarn install
ADD . /code
EXPOSE 3000
CMD ["yarn", "start"]
