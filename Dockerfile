FROM node:22-alpine
LABEL description="Frontend for Mizban Delivery Project"
LABEL maintainer="SkyTeams"

WORKDIR /mizban-delivery-frontend

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

EXPOSE 5173

ARG VITE_API_BASE_URL=https://mizban-delivery-backend.onrender.com/api

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

CMD ["npm", "run", "dev"]
