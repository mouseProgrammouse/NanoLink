import sqlite3, { Database } from 'sqlite3';
import * as dotenv from 'dotenv';
import path from 'path';
import { UrlRecord } from '../utils/type';
import { ENV_DEV } from '../utils/const';

dotenv.config();

const { DATABASE_PATH, DATABASE_NAME } = process.env;

if (!DATABASE_PATH || !DATABASE_NAME) {
  throw new Error(
    'DATABASE_PATH and DATABASE_NAME must be set in the environment.',
  );
}

const databasePath = path.join(DATABASE_PATH, DATABASE_NAME);

// Use verbose mode in development for better debugging
const sqlite3Instance =
  process.env.ENV === ENV_DEV ? sqlite3.verbose() : sqlite3;

let db: Database | null = null;

/**
 * Connects to the SQLite database.
 * @returns {Database} The SQLite database instance.
 * @throws {Error} If the connection fails.
 */
export const connectDB = (): Database => {
  if (db) {
    return db;
  }

  db = new sqlite3Instance.Database(databasePath, (err) => {
    if (err) {
      throw err.message;
    }
    console.log(`Connected to database: ${databasePath}`);
  });

  return db;
};

/**
 * Retrieves the URL record based on the long URL from the database.
 * @returns {Promise<UrlRecord | undefined>} A promise that resolves to the URL record.
 * @throws {Error} If the database is not initialized or there are no records.
 */
export const getShortUrl = (
  longUrl: string,
): Promise<UrlRecord | undefined> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      console.error('Database not initialized');
      return reject('Database not initialized');
    }

    const query = 'SELECT * FROM urls WHERE LONG_URL = ?';
    db.get(
      query,
      [longUrl],
      (
        err: { message: unknown },
        data: Record<string, unknown> | undefined,
      ) => {
        if (err) {
          console.error('Database select error:', err.message);
          return reject(err);
        }
        console.log('Get Short URL from database:', data);
        resolve(data as UrlRecord);
      },
    );
  });
};

/**
 * Retrieves the URL record from the database based on the Short URL.
 * @returns {Promise<UrlRecord | undefined>} A promise that resolves to the URL record.
 * @throws {Error} If the database is not initialized or there are no records.
 */
export const getLongUrl = (
  shortUrl: string,
): Promise<UrlRecord | undefined> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      console.error('Database not initialized');
      return reject('Database not initialized');
    }

    const query = 'SELECT * FROM urls WHERE SHORT_URL = ?';
    db.get(
      query,
      [shortUrl],
      (
        err: { message: unknown },
        data: Record<string, unknown> | undefined,
      ) => {
        if (err) {
          console.error('Database select error:', err.message);
          return reject(err);
        }
        console.log('Get Long URL from database:', data);
        resolve(data as UrlRecord);
      },
    );
  });
};

/**
 * Adds a new URL record to the database.
 * @param {string} shortUrl - The shortened URL.
 * @param {string} longUrl - The original long URL.
 * @returns {Promise<void>} A promise that resolves when the record is inserted.
 * @throws {Error} If the database is not initialized or the insertion fails.
 */
export const addUrlRecord = async (
  shortUrl: string,
  longUrl: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      console.error('Database not initialized');
      return reject(new Error('Database not initialized'));
    }

    const query =
      'INSERT INTO urls (SHORT_URL, LONG_URL, DATE) VALUES (?, ?, DATETIME("now"))';
    db.run(query, [shortUrl, longUrl], function (err) {
      if (err) {
        console.error('Database insert error:', err.message);
        return reject(err);
      }

      console.log(`Inserted new record with ID: ${this.lastID}`);
      resolve();
    });
  });
};

/**
 * Closes the database connection.
 * @returns {undefined}
 */
export const closeDB = (): undefined => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  }
};
