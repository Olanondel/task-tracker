import express from 'express';

import type { Response, Request } from 'express';
import type {
  Card,
  CreateCardRequest,
  GetCardsResponse,
} from '../types/cards/index.ts';
import type { IdParams } from '../types/common/index.ts';
import {
  createCard,
  deleteCard,
  getManyCards,
  getOneCard,
  updateCard,
} from '../database/cards-repository.ts';
import { randomUUID } from 'node:crypto';
import type { PutCardRequest } from '../types/cards/put-card-request.ts';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  async (request: Request, response: Response<GetCardsResponse>) => {
    const cards: Card[] = await getManyCards();

    response.status(200).send(cards);
  },
);

cardsRouter.get(
  '/:id',
  async (request: Request<IdParams>, response: Response<Card>) => {
    const card = await getOneCard(request.params.id);

    response.status(200).send(card);
  },
);

cardsRouter.post(
  '/',
  async (
    request: Request<{}, Card, CreateCardRequest>,
    response: Response<Card>,
  ) => {
    const card: Card = {
      id: randomUUID(),
      text: request.body.text,
    };

    await createCard(card);

    response.status(201).send(card);
  },
);

cardsRouter.put(
  '/:id',
  async (
    request: Request<IdParams, Card, PutCardRequest>,
    response: Response<Card>,
  ) => {
    const card = {
      id: request.params.id,
      text: request.body.text,
    };

    await updateCard(card);

    response.status(200).send(card);
  },
);

cardsRouter.delete(
  '/:id',
  async (request: Request<IdParams>, response: Response<void>) => {
    await deleteCard(request.params.id);

    response.sendStatus(204);
  },
);
