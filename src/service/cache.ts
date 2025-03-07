import Redis from 'ioredis';
import * as dotenv from 'dotenv';
import { OHE_HOUR } from '../utils/const';

dotenv.config();

const CACHE_TIME = process.env.CACHE_TIME
  ? Number(process.env.CACHE_TIME)
  : OHE_HOUR;
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

let redis: Redis | null = null;

/**
 * Establishes and returns a Redis connection.
 * If a connection already exists, it returns the existing instance.
 * @returns {Redis} Redis client instance.
 */
export const connectCache = (): Redis => {
  if (!redis) {
    redis = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });

    redis.on('connect', () => console.log('Connected to Redis'));
    redis.on('error', (err) => console.error('Redis error:', err));
    redis.on('end', () => console.log('Redis connection closed'));
  }

  return redis;
};

/**
 * Retrieves data from the cache using the provided key.
 * @param {string} cacheKey - The key to search for in Redis.
 * @returns {Promise<string | null>} The cached data as a string, or null if not found.
 * @throws {Error} If Redis is not connected.
 */
export const checkDataInCache = async (
  cacheKey: string,
): Promise<string | null> => {
  if (!redis) {
    console.error('Redis is not connected');
    throw new Error('Redis is not connected');
  }

  try {
    const cachedData = await redis.get(cacheKey);
    console.log(`Cache lookup: Key = ${cacheKey}, Data = ${cachedData}`);
    return cachedData;
  } catch (error) {
    console.error('Error retrieving data from cache:', error);
    throw error;
  }
};

/**
 * Stores data in the cache with an expiration time.
 * @param {string} cacheKey - The key under which data will be stored.
 * @param {unknown} dataToCache - The data to be cached.
 * @returns {Promise<void>}
 * @throws {Error} If Redis is not connected.
 */
export const setDataInCache = async (
  cacheKey: string,
  dataToCache: unknown,
): Promise<void> => {
  if (!redis) {
    console.error('Redis is not connected');
    throw new Error('Redis is not connected');
  }

  try {
    const result = await redis.set(
      cacheKey,
      JSON.stringify(dataToCache),
      'EX',
      CACHE_TIME,
    );
    if (result !== 'OK') {
      throw new Error('Failed to insert data into cache');
    }
  } catch (error) {
    console.error('Error setting data in cache:', error);
    throw error;
  }
};

export const closeCache = async () => {
  if (!redis) {
    console.error('Redis is not connected');
    return;
  }

  await redis.quit();
  console.log('Redis connection closed');
};
