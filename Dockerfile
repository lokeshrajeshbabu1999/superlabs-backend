# Use Node.js 18 (LTS) slim image as base
FROM node:18-slim AS builder

# Set working directory
WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apt-get update && apt-get install -y openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Final production image
FROM node:18-slim

WORKDIR /app

# Install OpenSSL in the final image
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY . .

# Ensure the uploads directory exists
RUN mkdir -p uploads

# Expose the API port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
