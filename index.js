const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const fs = require('fs');
const { toGlobalId, fromGlobalId }=require('graphql-relay');
// Construct a schema, using GraphQL schema language
const typeDefs = gql(fs.readFileSync('./schema.graphql').toString('utf8'));
const { getConfig, getLoc } = require('./otogi-client');
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
    loc: async ({ descId }, { loc }, ctx) => {
      let l = await getLoc(loc);
      if (!l) return null;
      l = l.bundles;
      return {
        name: l.MonsterName.strings[descId],
        desc: l.MonsterDesc.strings[descId],
        awakening: l.MonsterAwakening.strings[descId],
        firstObtain: l.MonsterFirstObtain.strings[descId],
        skillLine: l.MonsterSkillLine.strings[descId],
      };
    }
  },
  Query: {
    monster: async (root, { descId }, { config: { monster } }) => {
      const m = monster.find(a=>a.descId==descId);
      if (!m) return null;
      return m;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async (ctx) => ({
    config: await getConfig()
  }),
});

const app = new Koa();

//app.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

server.applyMiddleware({ app });

app.use((ctx, next)=>{
  ctx.redirect('/graphql');
  next();
});

app.listen({ port: process.env.PORT || 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
);
