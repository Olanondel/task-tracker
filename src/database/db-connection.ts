import sqlite3 from 'sqlite3';
import { SQLITE_PATH } from '../config.ts';

const db = new sqlite3.Database(SQLITE_PATH, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Db Ok');
});

// run
// get
// all

export const sqliteRun = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (error: unknown, data: unknown) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};

export const sqliteGet = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error: unknown, data: unknown) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};

export const sqliteAll = <T = unknown>(
  sql: string,
  params?: unknown[],
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error: unknown, data: T[]) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(data);
    });
  });
};
