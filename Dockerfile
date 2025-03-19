# Use a lightweight Node.js 18 Alpine image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app


# Copy package.json and package-lock.json first (for efficient caching of dependencies)
COPY package.json package-lock.json /app/

# Install application dependencies (AdonisJS)
RUN npm install

# Copy all the remaining files from the current directory into the container
COPY . /app/

# Expose the port the app will run on (default for Adonis is 3333)
EXPOSE 3333

# Set the default command to run the Adonis server in development mode
CMD ["npm", "run", "dev"]
