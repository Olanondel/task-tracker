import { sqliteRun } from './db-connection.ts';

export const createTables = async () => {
  await sqliteRun(`
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      text TEXT NOT NULL 
    )
  `);
};
