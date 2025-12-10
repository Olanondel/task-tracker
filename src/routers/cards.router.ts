import express from 'express';

import type { Response, Request } from 'express';
import type {
  Card,
  CreateCardRequest,
  GetCardsResponse,
} from '../types/cards/index.js';
import type { IdParams } from '../types/common/index.js';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  (request: Request, response: Response<GetCardsResponse>) => {},
);

cardsRouter.get(
  '/:id',
  (request: Request<IdParams>, response: Response<Card>) => {},
);

cardsRouter.post(
  '/',
  (request: Request<{}, CreateCardRequest>, response: Response<Card>) => {},
);

cardsRouter.put(
  '/:id',
  (request: Request<IdParams, Card>, response: Response<Card>) => {},
);

cardsRouter.delete(
  '/:id',
  (request: Request<IdParams>, response: Response<void>) => {},
);
