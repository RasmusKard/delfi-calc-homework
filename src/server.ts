import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";

// schema is `GraphQLSchema` instance
const schema = loadSchemaSync("**/*.gql", {
  // load from a single schema file
  loaders: [new GraphQLFileLoader()],
});

// You can add resolvers to that schema
const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers: resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

async function createApolloServer(port?: number) {
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });
  console.log(`🚀 Server ready at ${url}`);
  return { server: server, url: url };
}

export default createApolloServer;
