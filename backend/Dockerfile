# Use the official Node.js image
FROM --platform=linux/amd64 node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

RUN tsc -b

# Expose the port the app runs on
EXPOSE 3000



# Start the application
CMD ["node", "dist/index.js"]
