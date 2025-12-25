# 1. Base image (Node runtime)
FROM node:18-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package files first (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy application code
COPY . .

# 6. Expose application port
EXPOSE 3000

# 7. Start the application
CMD ["node", "app.js"]

