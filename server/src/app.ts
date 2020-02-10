import express from 'express';
import graphqlHttp from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import path from 'path';
import * as resolvers from './presenter/graphql-resolver';
import { makeSchema } from 'nexus';

const schema = makeSchema({
  types: {
    resolvers,
  },
  outputs: {
    schema: path.resolve(__dirname, '../src/generated', 'schema.graphql'),
    typegen: path.resolve(__dirname, '../src/generated', 'nexus.ts'),
  },
  typegenAutoConfig: {
    sources: [],
    contextType: 'Context',
  }
})

const app = express();

app
  .use('/graph', graphqlHttp({
    schema,
    graphiql: true,
  }))
  .get('/play', expressPlayground({ endpoint: '/graph' }));

app.listen(3000, () => console.log('start'))