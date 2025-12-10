import { sqliteAll, sqliteGet, sqliteRun } from './db-connection.ts';
import type { Column } from '../types/columns/column.ts';

export const createColumn = async (column: Column): Promise<void> => {
  await sqliteRun(
    `
    INSERT INTO columns (id, name, board_id)
    VALUES (?, ?, ?);
  `,
    [column.id, column.name, column.boardId],
  );
};

export const updateColumn = async (column: Column): Promise<void> => {
  await sqliteRun(
    `
    UPDATE columns SET name = ?
    WHERE id = ? AND board_id = ?;
  `,
    [column.name, column.id, column.boardId],
  );
};

export const deleteColumn = async (
  id: string,
  boardId: string,
): Promise<void> => {
  await sqliteRun(
    `
    DELETE FROM columns
    WHERE id = ? AND board_id = ?;
  `,
    [id, boardId],
  );
};

export const getOneColumn = async (
  id: string,
  boardId: string,
): Promise<Column> => {
  const data = await sqliteGet(
    `
    SELECT id, name, board_id AS "boardId" FROM columns
    WHERE id = ? AND board_id = ?;
  `,
    [id, boardId],
  );

  return data as Column;
};

export const getManyColumns = async (boardId: string): Promise<Column[]> => {
  const data = await sqliteAll(
    `
      SELECT id, name, board_id AS "boardId" FROM columns
    WHERE board_id = ?;
  `,
    [boardId],
  );

  return data as Column[];
};
