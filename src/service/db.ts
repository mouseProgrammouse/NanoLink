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

// we will use a debug mode in dev mode
const sqlite3Instance =
  process.env.ENV === ENV_DEV ? sqlite3.verbose() : sqlite3;

let db: Database | null = null;

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

export const getLastUrl = async (): Promise<UrlRecord> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      console.error('Database not initialized');
      return reject('Database not initialized');
    }

    db.all('SELECT * FROM URLS ORDER BY ID DESC LIMIT 1', [], (err, rows) => {
      if (err) {
        console.error('Database query error:', err.message);
        return reject(err);
      }

      if (!rows || rows.length === 0) {
        return reject('No records found');
      }

      console.log('rows', rows);
      resolve(rows[0] as UrlRecord);
    });
  });
};

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
