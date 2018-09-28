const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');

const { ApolloServer, gql } = require('apollo-server-koa');
const fs = require('fs');
const { toGlobalId, fromGlobalId }=require('graphql-relay');
// Construct a schema, using GraphQL schema language
const typeDefs = gql(fs.readFileSync('./schema.graphql').toString('utf8'));
const { getContext, getLoc } = require('./otogi-client');
// Provide resolver functions for your schema fields


const resolvers = {
  Node: {
    __resolveType({ id }) {
      //return fromGlobalId(id).type;
      return 'Monster';
    }
  },
  Artist: {
    id: a => toGlobalId('Artist', a.descId),
    monsters: ({ descId }, args, { config: { monster } }) =>
      monster.filter(a=>a.art===descId),
    total: ({ descId }, args, { config: { monster } }) =>
      monster.reduce((s,a)=>s+(a.art===descId), 0),
  },
  Bonds: {
    id: a => toGlobalId('Bonds', a.descId),
    monster: (a, args, { monsters }) => monsters[a.mid],
    target: (a, args, { monsters }) => monsters[a.ts],
  },
  Monster: {
    id: m => toGlobalId('Monster', m.descId),
    artist: async (m, args, { config: { artist } }) => {
      return artist.find(a=>a.descId==m.art);
    },
    baseHp: m=>m.bhp,
    skill: m=>{
      //m.sid
      return null;
    },
    profession: m=>m.p,
    gender: m=>m.gen,
    maxAtk: m=>m.ma,
    maxHp: m=>m.mhp,
    abilities: m=>{
      // m.aids
      return null;
    },
    maxLevel: m=>m.ml,
    baseAtk: m=>m.ba,
    loc: async ({ descId }, { language }, ctx) => {
      let l = await getLoc(language);
      if (!l) return null;
      l = l.bundles;
      return {
        name: l.MonsterName.strings[descId],
        desc: l.MonsterDesc.strings[descId],
        awakening: l.MonsterAwakening.strings[descId],
        firstObtain: l.MonsterFirstObtain.strings[descId],
        skillLine: l.MonsterSkillLine.strings[descId],
      };
    },
    bonds: (m, args, { config: { monsterEntanglement } }) => {
      const mid = m.descId;
      return monsterEntanglement.filter(
        a=>a.ts===mid || a.ts && a.mid===mid
      );
    }

  },
  Query: {
    monster(root, { descId }, { monsters }) {
      return monsters[descId] || null;
    },
    monsters(root, args, { config: { monster } }) {
      return monster;
    },
    artist(root, { descId }, { config: { artist } }) {
      return  artist.find(a=>a.descId===descId) || null;
    },
    artists(root, args, { artists }) {
      return artists;
    }
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: getContext,
});

const app = next({
  dev:process.env.NODE_ENV !== 'production'
});

const handle = app.getRequestHandler();

//app.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));


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
      console.log(`🚀 Server ready at http://localhost:3000${apolloServer.graphqlPath}`),
  );

});

/*
app.use((ctx, next)=>{
  ctx.redirect('/graphql');
  next();
});
*/
