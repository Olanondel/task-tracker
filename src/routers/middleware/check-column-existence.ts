import type { NextFunction, Request, Response } from 'express';
import type { ColumnIdParams } from '../../types/common/index.ts';
import { getOneColumn } from '../../database/columns-repository.ts';

export const checkColumnExistence = async (
  req: Request<ColumnIdParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const column = await getOneColumn(req.params.columnId, req.params.boardId);

  console.log('column', column);

  if (column) {
    next();
    return;
  }

  res.status(404).send('Column not found');
};
