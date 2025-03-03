/* eslint-disable */
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const databasePath = path.join(
  process.env.DATABASE_PATH,
  process.env.DATABASE_NAME,
);

// Ensure the database directory exists
if (!fs.existsSync(process.env.DATABASE_PATH)) {
  fs.mkdirSync(process.env.DATABASE_PATH, { recursive: true });
}

const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log(`Connected to database: ${databasePath}`);
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS urls (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        SHORT_URL TEXT UNIQUE NOT NULL,
        LONG_URL TEXT NOT NULL,
        DATE TEXT NOT NULL
    )`);

  // Insert a sample entry
  db.exec(
    `
        BEGIN TRANSACTION;
        INSERT INTO urls (SHORT_URL, LONG_URL, DATE) VALUES ('xY99', 'https://example.com', '2025-02-28T15:00:00.000Z');
        INSERT INTO urls (SHORT_URL, LONG_URL, DATE) VALUES ('hS88', 'https://google.com', '2025-02-28T14:30:00.000Z');
        COMMIT;
    `,
    (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
      } else {
        console.log('Both records inserted successfully!');
      }
    },
  );

  console.log('Database and tables created successfully!');
});

db.close();
