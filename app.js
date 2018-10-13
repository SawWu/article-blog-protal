const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(views(__dirname + '/views', {extension: 'pug'}));

const ip = '127.0.0.1';
const post = '3000';

router.get('/', async (ctx) => {
  let articles = [
    {
      id: 1,
      title: 'Title One',
      author: 'hfpp2012'
    },
    {
      id: 2,
      title: 'Title Two',
      author: 'hfpp2012'
    },
    {
      id: 3,
      title: 'Title Three',
      author: 'hfpp2012'
    }
  ]
  await ctx.render('index',{
    title: 'article-blog-protal',
    articles
  })
});

app.use(router.routes());

app.listen(post, () => {
  console.log(`Server is listening on http://${ip}:${post}`);
})
