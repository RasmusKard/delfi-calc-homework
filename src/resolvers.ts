import {
  Resolvers,
  OperationType,
  ValueInput,
  OperationInput,
} from "./generated/graphql.js";

import { getCacheIfPresent, setCacheValue, getCacheKey } from "./redis.js";
import { GraphQLError } from "graphql";

async function calculate(values: number[], opType: OperationType) {
  if (!values.length) {
    throw new GraphQLError("Empty ValueInput", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const cacheKey = getCacheKey(opType, values);
  const cachedData = await getCacheIfPresent(cacheKey);
  if (cachedData) {
    return parseFloat(cachedData);
  }

  let opResult;
  switch (opType) {
    case OperationType.Sum:
      opResult = values.reduce((a, b) => a + b);
      break;
    case OperationType.Subtract:
      opResult = values.reduce((a, b) => a - b);
      break;
    case OperationType.Multiply:
      opResult = values.reduce((a, b) => a * b);
      break;
    case OperationType.Divide:
      opResult = values.reduce((a, b) => a / b);
      break;
    default:
      throw new GraphQLError("Unknown operation type", {
        extensions: { code: "BAD_USER_INPUT" },
      });
  }

  setCacheValue(cacheKey, opResult);
  return opResult;
}

async function resolveValue(values: ValueInput, parentOpType: OperationType) {
  // if is numbers then do calc based on parent operation type
  if (values.numbers) {
    return calculate(values.numbers, parentOpType);
  }

  // if is operation then recursively call resolve
  if (values.operation) {
    return resolveOperation(values.operation);
  }

  throw new GraphQLError("Empty ValueInput", {
    extensions: { code: "BAD_USER_INPUT" },
  });
}

async function resolveOperation(operation: OperationInput): Promise<number> {
  const parentOpType = operation.type;

  const childOpPromises = operation.values.map((childValue) =>
    resolveValue(childValue, parentOpType)
  );

  const childOpResults = await Promise.all(childOpPromises);

  return await calculate(childOpResults, parentOpType);
}

export const resolvers: Resolvers = {
  Query: {
    sum: (_, { nums }) => calculate(nums, OperationType.Sum),

    subtract: (_, { nums }) => calculate(nums, OperationType.Subtract),

    multiply: (_, { nums }) => calculate(nums, OperationType.Multiply),

    divide: (_, { nums }) => calculate(nums, OperationType.Divide),

    nestedCalc: (_, { operation }) => resolveOperation(operation),
  },
};
