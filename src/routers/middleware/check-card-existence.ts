import type { NextFunction, Request, Response } from 'express';
import type { CardIdParams } from '../../types/common/index.ts';
import { getOneCard } from '../../database/cards-repository.ts';
import type { Card } from '../../types/cards/index.ts';

export const checkCardExistence = async (
  req: Request<CardIdParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const card: Card = await getOneCard(req.params);

  if (card) {
    next();
    return;
  }

  res.status(404).send('Card not found');
};
