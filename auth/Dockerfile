FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]


# FROM node:alpine

# WORKDIR /app
# COPY package.json .
# RUN yarn
# COPY . .

# CMD ["yarn", "start"]
