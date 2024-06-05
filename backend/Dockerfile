# Use the official Node.js image (change to version 18.13.0 if needed)
FROM --platform=linux/amd64 node:18.13.0

# Install dependencies
RUN apt-get update && apt-get install -y \
    python \
    make \
    gcc \
    g++ \
    gnupg \
    wget

# Install google-chrome-stable
RUN wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install TypeScript globally
RUN npm install -g typescript

# Determine the path of the installed Google Chrome
RUN which google-chrome-stable || true

# Create a user with name 'app' and group that will be used to run the app
RUN groupadd -r app && useradd -rm -g app -G audio,video app

# Set the working directory
WORKDIR /home/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Change ownership of the working directory to 'app' user
RUN chown -R app:app /home/app

# Switch to the app user
USER app

# Set Puppeteer cache directory
ENV PUPPETEER_CACHE_DIR=/home/app/.cache/puppeteer

# Create Puppeteer cache directory
RUN mkdir -p /home/app/.cache/puppeteer

# Install dependencies with npm
# RUN npm install puppeteer --no-save
RUN npm install

# Copy the rest of the application code
COPY --chown=app:app . .

# Build the application
RUN tsc -b

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV JWT_SECRET=very_very_parivarik

# Start the application
CMD ["node", "dist/index.js"]
