import { createHandler } from "graphql-http/lib/use/express";
import express from "express";
import cors from "cors";
import expressPlayground from "graphql-playground-middleware-express";
import { resolvers } from "./resolvers";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";

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

const app = express();

// Create and use the GraphQL handler.
app.use(cors());
app.all(
  "/graphql",
  createHandler({
    schema: schemaWithResolvers,
  })
);
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
