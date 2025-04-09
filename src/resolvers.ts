import { Resolvers } from "./generated/graphql.js";
import { OperationType } from "./generated/graphql.js";
import { ValueInput, OperationInput } from "./generated/graphql.js";

// operationi type ja operationi value
// operationi value sees on nested numbers[] ning potentsiaalselt veel operation

// if input.operationtype
// call resolveoperation to resolve it

// if input.numbers
// use current operationtype to resolve it

// if values.operation
// map it onto resolveoperation

function reduceValues(values: number[], operation: OperationType) {
  switch (operation) {
    case OperationType.Sum:
      return values.reduce((a, b) => a + b);
    case OperationType.Subtract:
      return values.reduce((a, b) => a - b);
    case OperationType.Multiply:
      return values.reduce((a, b) => a * b);
    case OperationType.Divide:
      return values.reduce((a, b) => a / b);
  }
}

function resolveValue(values: ValueInput, operation: OperationType) {
  // if is numbers then do calc based on operation
  if (values.numbers) {
    return reduceValues(values.numbers, operation);
  }

  // if is operation then recursively call this
  if (values.operation) {
    const childValues = values.operation.values.map((input) =>
      resolveValue(input, values.operation.type)
    );

    return reduceValues(childValues, values.operation.type);
  }
}

export const resolvers: Resolvers = {
  Query: {
    sum: (_, { input }) => {
      return reduceValues(input, OperationType.Sum);
    },
    subtract: (_, { input }) => {
      return reduceValues(input, OperationType.Subtract);
    },
    multiply: (_, { input }) => {
      return reduceValues(input, OperationType.Multiply);
    },
    divide: (_, { input }) => {
      return reduceValues(input, OperationType.Divide);
    },
    calculate: (_parent, { input }) => {
      const opType = input.type;
      const thing = input.values.map((input) => {
        return resolveValue(input, opType);
      });
      return reduceValues(thing, opType);
    },
  },
};
