import express from 'express';

import type { Response, Request } from 'express';
import type {
  Card,
  CreateCardRequest,
  GetCardsResponse,
} from '../types/cards/index.ts';
import {
  createCard,
  deleteCard,
  getManyCards,
  getOneCard,
  updateCard,
} from '../database/cards-repository.ts';
import { randomUUID } from 'node:crypto';
import type { PutCardRequest } from '../types/cards/put-card-request.ts';
import { validateCardInput } from '../validation/index.ts';
import type { CardIdParams, ColumnIdParams } from '../types/common/index.ts';
import {
  checkCardExistence,
  checkColumnExistence,
} from './middleware/index.ts';
import type { Column } from '../types/columns/index.ts';
import { getOneColumn } from '../database/columns-repository.ts';

export const cardsRouter = express.Router({ mergeParams: true });

cardsRouter.get(
  '/',
  async (
    request: Request<ColumnIdParams>,
    response: Response<GetCardsResponse>,
  ) => {
    const cards: Card[] = await getManyCards(request.params);

    response.status(200).send(cards);
  },
);

cardsRouter.get(
  '/:cardId',
  async (request: Request<CardIdParams>, response: Response<Card>) => {
    const card = await getOneCard(request.params);

    response.status(200).send(card);
  },
);

cardsRouter.post(
  '/',
  validateCardInput,
  checkColumnExistence,
  async (
    request: Request<ColumnIdParams, Card, CreateCardRequest>,
    response: Response<Card>,
  ) => {
    const card: Card = {
      id: randomUUID(),
      text: request.body.text,
      columnId: request.params.columnId,
    };

    await createCard(card);

    response.status(201).send(card);
  },
);

cardsRouter.put(
  '/:cardId',
  validateCardInput,
  checkCardExistence,
  async (
    request: Request<CardIdParams, Card, PutCardRequest>,
    response: Response<Card | string>,
  ) => {
    if (request.params.columnId !== request.body.columnId) {
      const column: Column = await getOneColumn(
        request.body.columnId,
        request.params.boardId,
      );

      if (!column) {
        response.status(404).send('Column not found');
        return;
      }
    }

    const card: Card = {
      id: request.params.cardId,
      text: request.body.text,
      columnId: request.body.columnId,
    };

    await updateCard(card);

    response.status(200).send(card);
  },
);

cardsRouter.delete(
  '/:cardId',
  checkCardExistence,
  async (request: Request<CardIdParams>, response: Response<void>) => {
    await deleteCard(request.params.cardId);

    response.sendStatus(204);
  },
);
