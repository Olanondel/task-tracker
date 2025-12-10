import type { Request, Response } from 'express';
import type { IdParams } from '../types/common/index.ts';
import type { Board } from '../types/boards/index.ts';
import type { CreateBoardRequest } from '../types/boards/create-board-request.ts';

export const validateBoardInput = (
  { body }: Request<IdParams, Board, CreateBoardRequest>,
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
