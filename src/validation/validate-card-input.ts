import type { Request, Response } from 'express';
import type { Card, CreateCardRequest } from '../types/cards/index.ts';

export const validateCardInput = (
  { body }: Request<{}, Card, CreateCardRequest>,
  response: Response,
  next: () => void,
) => {
  if (body.text) {
    next();
    return;
  }

  response.status(400).send({
    error: 'Validation error',
  });
};
