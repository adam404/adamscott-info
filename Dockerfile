FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# Add a clean step to ensure no cached modules
RUN npm cache clean --force
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]