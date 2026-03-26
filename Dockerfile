# Stage 1: Build
FROM node:20-alpine AS base

# stage 1
FROM base AS builder
WORKDIR /home/build

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2
FROM nginx:alpine AS runner

WORKDIR /home/app

COPY --from=builder /home/build/dist /usr/share/nginx/html
COPY --from=builder /home/build/package*.json .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
