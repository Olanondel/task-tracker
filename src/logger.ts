import type { Request, Response } from 'express';

export const logger = (
  request: Request,
  response: Response,
  next: () => void,
) => {
  console.log(`${request.method} -> ${request.originalUrl}`);

  next();
};
