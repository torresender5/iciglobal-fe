FROM node:23-alpine

WORKDIR /ici_global_fe


COPY package*.json ./
# RUN npm i -g vite
# RUN npm install --include=dev
RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev"]