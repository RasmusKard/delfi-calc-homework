import {
  Resolvers,
  OperationType,
  ValueInput,
  OperationInput,
} from "./generated/graphql.js";

function calculate(values: number[], opType: OperationType) {
  switch (opType) {
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

function resolveValue(values: ValueInput, parentOpType: OperationType) {
  // if is numbers then do calc based on parent operation type
  if (values.numbers) {
    return calculate(values.numbers, parentOpType);
  }

  // if is operation then recursively call resolve
  if (values.operation) {
    return resolveOperation(values.operation);
  }
}

function resolveOperation(operation: OperationInput) {
  const parentOpType = operation.type;

  const childOpResults = operation.values.map((childValue) =>
    resolveValue(childValue, parentOpType)
  );

  return calculate(childOpResults, parentOpType);
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
