# we use the alpine to use a light version of nodejs to make the image light
FROM node:22-alpine
LABEL description="Frontend for Mizban Delivery Project"
LABEL maintainer="SkyTeams"
# specify the working directory that should be used in the container storage, if not present this folder will be created by Docker
WORKDIR /mizban-delivery-frontend
COPY package*.json ./
RUN ["npm", "install"]
# copy all the source code to the work directory
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
