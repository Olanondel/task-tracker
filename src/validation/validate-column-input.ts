import type { Request, Response } from 'express';
import type { Column, CreateColumnsRequest } from '../types/columns/index.ts';
import type { ColumnIdParams } from '../types/common/index.ts';

export const validateColumnInput = (
  { body }: Request<ColumnIdParams, Column, CreateColumnsRequest>,
  response: Response,
  next: () => void,
) => {
  if (body.name) {
    next();
    return;
  }

  response.status(400).send({
    error: 'Validation error',
  });
};
