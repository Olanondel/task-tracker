import express from 'express';

import type { Response, Request } from 'express';
import type { Board, GetBoardsResponse } from '../types/boards/index.ts';
import type { BoardIdParams } from '../types/common/index.ts';

import { randomUUID } from 'node:crypto';
import type { PutBoardRequest } from '../types/boards/put-board-request.ts';
import {
  createBoard,
  deleteBoard,
  getManyBoards,
  getOneBoard,
  updateBoard,
} from '../database/boards-repository.ts';
import type { CreateBoardRequest } from '../types/boards/create-board-request.ts';
import { validateBoardInput } from '../validation/index.ts';

export const boardsRouter = express.Router();

boardsRouter.get(
  '/',
  async (request: Request, response: Response<GetBoardsResponse>) => {
    const boards: Board[] = await getManyBoards();

    response.status(200).send(boards);
  },
);

boardsRouter.get(
  '/:boardId',
  async (request: Request<BoardIdParams>, response: Response<Board>) => {
    const board = await getOneBoard(request.params.boardId);

    response.status(200).send(board);
  },
);

boardsRouter.post(
  '/',
  validateBoardInput,
  async (
    request: Request<{}, Board, CreateBoardRequest>,
    response: Response<Board>,
  ) => {
    const board: Board = {
      id: randomUUID(),
      name: request.body.name,
    };

    await createBoard(board);

    response.status(201).send(board);
  },
);

boardsRouter.put(
  '/:boardId',
  validateBoardInput,
  async (
    request: Request<BoardIdParams, Board, PutBoardRequest>,
    response: Response<Board>,
  ) => {
    const board = {
      id: request.params.boardId,
      name: request.body.name,
    };

    await updateBoard(board);

    response.status(200).send(board);
  },
);

boardsRouter.delete(
  '/:boardId',
  async (request: Request<BoardIdParams>, response: Response<void>) => {
    await deleteBoard(request.params.boardId);

    response.sendStatus(204);
  },
);
