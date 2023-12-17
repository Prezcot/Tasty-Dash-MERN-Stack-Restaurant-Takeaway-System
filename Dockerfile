# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .


