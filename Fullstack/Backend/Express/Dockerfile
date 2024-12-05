# Dockerfile for Express (Node.js)
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY ./ ./

# Expose the port Express is running on
EXPOSE 3000

# Command to run the Express app
CMD ["npm", "start"]
