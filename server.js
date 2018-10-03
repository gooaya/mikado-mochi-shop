const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const apolloServer = require('./apollo-server');

const app = next({
  dev:process.env.NODE_ENV !== 'production'
});

const handle = app.getRequestHandler();

app.prepare().then(()=>{
  const server = new Koa();
  const router = new Router();

  apolloServer.applyMiddleware({ app: server });

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.response = false;
  });

  server.use(router.routes());
  server.listen(
    { port: process.env.PORT || 3000 },
    () =>
      console.log(`🚀 Server ready at http://localhost:3000`),
  );
});

/*
app.use((ctx, next)=>{
  ctx.redirect('/graphql');
  next();
});
*/
