import { Resolvers, Test } from "./src/generated/graphql.js";

export const resolvers: Resolvers = {
  Query: {
    test: () => {
      return { bruhh: "test" };
    },
  },
};
