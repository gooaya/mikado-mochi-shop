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
  Monster: {
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
    monster: async (root, { descId }, ctx) => {
      const monster = (await getConfig()).monster;
      const m = monster.find(a=>a.descId==descId);
      if (!m) return null;
      return {
        id: toGlobalId('Monster', m.descId),
        ...m,
      };
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
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
