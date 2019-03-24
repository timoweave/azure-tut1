FROM node:10

ARG NODE_ENV=production
ARG PORT=3000

ENV NODE_ENV $NODE_ENV
ENV PORT $PORT

EXPOSE $PORT

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# HEALTHCHECK --interval=30s CMD node healthcheck.js

WORKDIR /app/app
COPY . .

CMD [ "node", "app.js" ]
