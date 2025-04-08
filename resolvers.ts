import { Resolvers } from "./src/generated/graphql.js";

export const resolvers: Resolvers = {
  Query: {
    sum: (_, { input }) => {
      return input.reduce((sum, partialSum) => sum + partialSum, 0);
    },
  },
};
