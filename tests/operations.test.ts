import { after, before, describe, it } from "node:test";
import createApolloServer from "../server";
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
          sum(input: ${threeOperandInput})
        }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response);

    assert.strictEqual(response.body.data?.sum, 9);
  });

  it("subtract returns collect value with 3 operands", async () => {
    const queryData = {
      query: `
        query {
          subtract(input: ${threeOperandInput})
        }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response);
    assert.strictEqual(response.body.data?.subtract, -1);
  });

  it("multiply returns collect value with 3 operands", async () => {
    const queryData = {
      query: `
        query {
          multiply(input: ${threeOperandInput})
        }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response);
    assert.strictEqual(response.body.data?.multiply, 24);
  });

  it("divide returns collect value with 3 operands", async () => {
    const queryData = {
      query: `
        query {
          divide(input: ${threeOperandInput})
        }
      `,
    };
    const response = await request(url).post("/").send(queryData);
    assert.ok(response);
    assert.strictEqual(response.body.data?.divide, 2 / 3);
  });
});
