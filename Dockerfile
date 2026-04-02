# Stage 1: Build
FROM node:20-alpine AS base

# stage 1
FROM base AS builder
WORKDIR /home/build

RUN apk add --no-cache curl

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_KEY
ARG VITE_AUTH_DOMAIN
ARG VITE_PROJECT_ID
ARG VITE_STORAGE_BUCKET
ARG VITE_MESSAGING_SENDER_ID
ARG VITE_APP_ID
ARG VITE_MEASUREMENT_ID

ENV VITE_API_KEY=AIzaSyB1_UTaumsgko1BuA1icg3EY9rvaxvNgoE
ENV VITE_AUTH_DOMAIN=gringotts-bb246.firebaseapp.com
ENV VITE_PROJECT_ID=gringotts-bb246
ENV VITE_STORAGE_BUCKET=gringotts-bb246.firebasestorage.app
ENV VITE_MESSAGING_SENDER_ID=1024975783242
ENV VITE_APP_ID=1:1024975783242:web:29e715afdb6bdb7c00edb3
ENV VITE_MEASUREMENT_ID=G-N012CJG7L8

RUN npm run build

# Stage 2
FROM nginx:alpine AS runner

WORKDIR /home/app

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /home/build/dist /usr/share/nginx/html
COPY --from=builder /home/build/package*.json .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
