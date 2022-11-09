FROM node:bullseye-slim
COPY . /app
WORKDIR /app
CMD npm run serve