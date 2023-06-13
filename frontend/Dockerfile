# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:18.12.1-buster-slim AS react-build

ARG TARGETOS=linux
ARG REACT_APP_BUILD_TIME
ARG PUBLIC_URL

# Checking environment variables
RUN env

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /frontend

# Copies package.json and package-lock.json to Docker environment
COPY package.json ./
COPY package-lock.json ./
COPY . .

# Installs all node packages except Cypress
RUN npm ci

# Finally runs the application
RUN npm run build

# Stage 2: the production environment
FROM nginx:1.23.2-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY  --from=react-build /frontend/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
