FROM node:20-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV EGG_SERVER_ENV=prod
ENV TZ=Asia/Taipei
ENV PORT=8080
ENV DISABLE_DB=true

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "node_modules/.bin/egg-scripts start --workers=1 --daemon=false --port=${PORT:-8080}"]
