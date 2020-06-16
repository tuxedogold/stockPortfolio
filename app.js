const Koa = require('koa');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const Router = require('koa-router');
const app = new Koa();
 

// log all events to the terminal
app.use(logger());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

// instantiate our new Router
const router = new Router();
const portfolioRouter = new Router({
  prefix: '/portfolio'
});
// require our external routes and pass in the router
require('./routes/basic')({ router });
require('./routes/portfolio')({ portfolioRouter });


// tells the router to use all the routes that are on the object
app.use(router.routes());
app.use(router.allowedMethods());

app.use(portfolioRouter.routes());
app.use(portfolioRouter.allowedMethods());


//setup vars for payload in get request
app.use(koaBody());
// tell the server to listen to events on a specific port
const server = app.listen(3000);
module.exports = server;