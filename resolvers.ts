import { Resolvers } from "./src/generated/graphql.js";

export const resolvers: Resolvers = {
  Query: {
    sum: (_, { input }) => {
      return input.reduce((value, partialResult) => value + partialResult);
    },
    subtract: (_, { input }) => {
      return input.reduce((value, partialResult) => value - partialResult);
    },
    multiply: (_, { input }) => {
      return input.reduce((value, partialResult) => value * partialResult);
    },
    divide: (_, { input }) => {
      return input.reduce((value, partialResult) => value / partialResult);
    },
  },
};
