FROM node:22-alpine
LABEL description="Frontend for Mizban Delivery Project"
LABEL maintainer="SkyTeams"

WORKDIR /mizban-delivery-frontend

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
