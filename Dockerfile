FROM node:lts-alpine AS builder
WORKDIR /home/koa
COPY . /home/koa/
RUN npm ci --no-audit
RUN npm run build
RUN npm run ci:generate


FROM node:lts-alpine
WORKDIR /app

COPY --from=builder /home/koa/bin /app
COPY --from=builder /home/koa/package*.json /app
COPY --from=builder /home/koa/prisma /app/prisma

RUN npm install --production

EXPOSE 80
CMD ["./launch.sh"]