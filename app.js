const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

const ip = '127.0.0.1';
const post = '3000';

router.get('/', (ctx) => {
  ctx.body = '<h1>Hello Koa</h1>';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(post, () => {
  console.log(`Server is listening on http://${ip}:${post}`);
})
