import express from 'express';

import type { Response, Request } from 'express';
import type {
  Column,
  CreateColumnsRequest,
  GetColumnsResponse,
} from '../types/columns/index.ts';
import type { BoardIdParams, ColumnIdParams } from '../types/common/index.ts';

import { randomUUID } from 'node:crypto';
import {
  createColumn,
  deleteColumn,
  getManyColumns,
  getOneColumn,
  updateColumn,
} from '../database/columns-repository.ts';
import { validateColumnInput } from '../validation/index.ts';

export const columnsRouter = express.Router({ mergeParams: true });

columnsRouter.get(
  '/',
  async (
    request: Request<ColumnIdParams>,
    response: Response<GetColumnsResponse>,
  ) => {
    const columns: Column[] = await getManyColumns(request.params.boardId);

    response.status(200).send(columns);
  },
);

columnsRouter.get(
  '/:columnId',
  async (request: Request<ColumnIdParams>, response: Response<Column>) => {
    const column = await getOneColumn(
      request.params.columnId,
      request.params.boardId,
    );

    response.status(200).send(column);
  },
);

columnsRouter.post(
  '/',
  validateColumnInput,
  async (
    request: Request<BoardIdParams, Column, CreateColumnsRequest>,
    response: Response<Column>,
  ) => {
    const column: Column = {
      id: randomUUID(),
      name: request.body.name,
      boardId: request.params.boardId,
    };

    await createColumn(column);

    response.status(201).send(column);
  },
);

columnsRouter.put(
  '/:columnId',
  validateColumnInput,
  async (
    request: Request<ColumnIdParams, Column, CreateColumnsRequest>,
    response: Response<Column>,
  ) => {
    const column: Column = {
      id: request.params.columnId,
      name: request.body.name,
      boardId: request.params.boardId,
    };

    await updateColumn(column);

    response.status(200).send(column);
  },
);

columnsRouter.delete(
  '/:columnId',
  async (request: Request<ColumnIdParams>, response: Response<void>) => {
    await deleteColumn(request.params.columnId, request.params.boardId);

    response.sendStatus(204);
  },
);
