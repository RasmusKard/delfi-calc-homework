import { createClient } from "redis";
import hash from "object-hash";
import { OperationType } from "./generated/graphql.js";

const redisClient = createClient({ url: "redis://redis" });

redisClient.on("error", (err) => console.log("Redis Client Error", err));

await redisClient.connect();

export function getCacheKey(opType: OperationType, values: number[]) {
  const isUnordered = [OperationType.Sum, OperationType.Multiply].includes(
    opType
  );
  // if opType is sum or multiply the order is ignored for caching (commutative)
  if (isUnordered) {
    values.sort((a, b) => a - b);
  }

  const valuesHash = hash(values);
  return `${valuesHash}:${opType}`;
}

export function getCacheValue(cacheKey: string) {
  if (!redisClient.isReady) {
    return;
  }

  return redisClient.get(cacheKey);
}

export async function getCacheIfPresent(cacheKey: string) {
  const isCached = await redisClient.exists(cacheKey);

  if (!isCached) {
    return;
  }

  return await getCacheValue(cacheKey);
}

export function setCacheValue(cacheKey: string, opResult: number) {
  if (!redisClient.isReady) {
    return;
  }

  redisClient.set(cacheKey, opResult);
}

export default redisClient;
