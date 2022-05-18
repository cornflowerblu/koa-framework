import Koa from 'koa'

const app = new Koa();

app.use((ctx: { body: string; }) => {
  ctx.body = 'Hello World';
});

console.log(`Preview app available at http://localhost:8080`)
app.listen(8080);