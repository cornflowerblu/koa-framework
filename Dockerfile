FROM node:lts-alpine AS builder
WORKDIR /home/koa
COPY . /home/koa/
RUN npm ci --audit false
run npx prisma:generate
RUN npm run build


FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /home/koa/bin /app
COPY --from=builder /home/koa/scripts /app/
COPY --from=builder /home/koa/prisma /app/prisma
COPY --from=builder /home/koa/package*.json /app
RUN npm ci --production
EXPOSE 80
CMD ["./launch.sh"]