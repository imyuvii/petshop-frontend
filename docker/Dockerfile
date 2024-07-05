# Stage 1: Build the application
FROM node:20-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.production .env
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine as production-stage

WORKDIR /app

# Install http-server
RUN npm install -g http-server

COPY --from=build-stage /app/dist /app
COPY .env.production .env

EXPOSE 8080

CMD ["http-server", "/app", "-p", "8080"]
