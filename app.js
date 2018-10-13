const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger')
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

app.use(logger()).use(bodyParser())
app.use(views(__dirname + '/views', {extension: 'pug'}));
app.use(serve(__dirname + 'bower_components'));
app.use(serve(__dirname + '/public'));

const ip = '127.0.0.1';
const post = '3000';

mongoose.connect(`mongodb://${ip}/article-blog`, {useNewUrlParser: true});

let db = mongoose.connection;

const Article = require('./models/article');

let articles = [];
Article.find({}, (err, value) => {
  articles = value
});

router.get('/', async (ctx) => {
  await ctx.render('index', {
    title: 'article-blog-protal',
    articles,
  });
})

router.get('/articles/new', async (ctx) => {
  await ctx.render('new', {
    title: 'Add Article'
  });
})

router.post('/articles/create', async (ctx) => {
  let article = new Article(ctx.request.body);
  await article.save(async (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(ctx.redirect);
      await ctx.redirect('/')
    }
  })
})

app.use(router.routes());

db.once('open', () => {
  console.log('Connected to Mongodb');
  app.listen(post, () => {
    console.log(`Server is listening on http://${ip}:${post}`);
  })
});

db.on('error', (err) => {
  console.log(err);
});


