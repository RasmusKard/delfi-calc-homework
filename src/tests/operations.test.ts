import { after, before, describe, it } from "node:test";
import createApolloServer from "../server.js";
import request from "supertest";
import { ApolloServer, BaseContext } from "@apollo/server";
import assert from "node:assert/strict";

describe("test graphql operations", async () => {
  let server: ApolloServer<BaseContext>, url: string;

  before(async () => {
    ({ server, url } = await createApolloServer());
  });

  after(async () => {
    await server?.stop();
  });

  const threeOperandInput = JSON.stringify([4, 2, 3]);

  it("sum returns collect value with 3 operands", async () => {
    const queryData = {
      query: `
        query {
          sum(nums: ${threeOperandInput})
        }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response.ok);

    assert.strictEqual(response.body.data?.sum, 9);
  });

  it("subtract returns collect value with 3 operands", async () => {
    const queryData = {
      query: `
        query {
          subtract(nums: ${threeOperandInput})
        }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response.ok);
    assert.strictEqual(response.body.data?.subtract, -1);
  });

  it("multiply returns collect value with 3 operands", async () => {
    const queryData = {
      query: `
        query {
          multiply(nums: ${threeOperandInput})
        }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response.ok);
    assert.strictEqual(response.body.data?.multiply, 24);
  });

  it("divide returns collect value with 3 operands", async () => {
    const queryData = {
      query: `
        query {
          divide(nums: ${threeOperandInput})
        }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response.ok);
    assert.strictEqual(response.body.data?.divide, 2 / 3);
  });

  it("nested sum with 3 operations", async () => {
    const queryData = {
      query: `
          query {
            nestedCalc(
              operation: {
                type: SUM
                values: [
                  { numbers: [1, 2, 3] }
                  {
                    operation: {
                      type: SUM
                      values: [
                        { numbers: [2, 34] }
                        { operation: { type: SUM, values: { numbers: [4, 543, 23] } } }
                      ]
                    }
                  }
                ]
              }
            )
      }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response.ok);

    assert.strictEqual(response.body.data?.nestedCalc, 612);
  });

  it("nested subtract with 3 operations", async () => {
    const queryData = {
      query: `
          query {
            nestedCalc(
              operation: {
                type: SUBTRACT
                values: [
                  { numbers: [1, 2, 3] }
                  {
                    operation: {
                      type: SUBTRACT
                      values: [
                        { numbers: [2, 34] }
                        { operation: { type: SUBTRACT, values: { numbers: [4, 543, 23] } } }
                      ]
                    }
                  }
                ]
              }
            )
      }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response.ok);
    assert.strictEqual(response.body.data?.nestedCalc, -534);
  });

  it("nested multiply with 3 operations", async () => {
    const queryData = {
      query: `
          query {
            nestedCalc(
              operation: {
                type: MULTIPLY
                values: [
                  { numbers: [1, 2, 3] }
                  {
                    operation: {
                      type: MULTIPLY
                      values: [
                        { numbers: [2, 34] }
                        { operation: { type: MULTIPLY, values: { numbers: [4, 543, 23] } } }
                      ]
                    }
                  }
                ]
              }
            )
      }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response.ok);

    assert.strictEqual(response.body.data?.nestedCalc, 20382048);
  });

  it("nested divide with 3 operations", async () => {
    const queryData = {
      query: `
          query {
            nestedCalc(
              operation: {
                type: DIVIDE
                values: [
                  { numbers: [1, 4, 2] }
                  {
                    operation: {
                      type: DIVIDE
                      values: [
                        { numbers: [4, 2] }
                        { operation: { type: DIVIDE, values: { numbers: [4, 2, 8] } } }
                      ]
                    }
                  }
                ]
              }
            )
      }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response.ok);

    assert.strictEqual(response.body.data?.nestedCalc, 0.015625);
  });
});
