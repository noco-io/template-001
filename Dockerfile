FROM node:22-alpine
RUN apk add --no-cache git

# Create app directory
WORKDIR /noco

# Install app dependencies for both app and api
COPY ./app/package*.json ./app/
COPY ./api/package*.json ./api/
RUN cd app && npm install
RUN cd api && npm install

# Create a backup of node_modules
RUN cp -r node_modules /tmp/app_node_modules

# Copy source files
COPY . /noco/app
COPY start.sh /noco/start.sh
COPY fileManager.js /noco/fileManager.js

# Create api directory and move api node_modules there
RUN mkdir -p /noco/api
RUN mv /tmp/app_node_modules /noco/preserved_node_modules

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=development
# API_WEBSOCKET_URL will be passed at runtime

# Expose the port
EXPOSE 3000

# Start command: run both Next.js dev server and file manager
CMD ["/bin/sh", "start.sh"]
