const DEFAULT_PORT = 80;

export const PORT = process.env.PORT || DEFAULT_PORT;
export const SQLITE_PATH = process.env.SQLITE_PATH || './db';
export const ADMIN_LOGIN = process.env.ADMIN_LOGIN || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
