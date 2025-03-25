FROM node:22-alpine
RUN apk add --no-cache git

# Create app directory
WORKDIR /noco

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . /noco/app
COPY start.sh /noco/start.sh
COPY fileManager.js /noco/fileManager.js
RUN mkdir -p /noco/api

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=development
# API_WEBSOCKET_URL will be passed at runtime

# Expose the port
EXPOSE 3000

# Start command: run both Next.js dev server and file manager
CMD ["/bin/sh", "start.sh"]
