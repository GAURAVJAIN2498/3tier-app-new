# ---- build stage ----
FROM node:18-alpine as build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build React app
RUN npm run build

# ---- run stage ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config
RUN printf 'server {\n\
  listen 80;\n\
  location / {\n\
    root   /usr/share/nginx/html;\n\
    index  index.html;\n\
    try_files $uri /index.html;\n\
  }\n\
  location /api/ {\n\
    proxy_pass http://backend:5000/;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

