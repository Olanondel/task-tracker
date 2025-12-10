import { sqliteAll, sqliteGet, sqliteRun } from './db-connection.ts';
import type { Board } from '../types/boards/board.ts';

export const createBoard = async (board: Board): Promise<void> => {
  await sqliteRun(
    `
    INSERT INTO boards (id, name)
    VALUES (?, ?);
  `,
    [board.id, board.name],
  );
};

export const updateBoard = async (board: Board): Promise<void> => {
  await sqliteRun(
    `
    UPDATE boards SET name = ?
    WHERE id = ?;
  `,
    [board.name, board.id],
  );
};

export const deleteBoard = async (id: string): Promise<void> => {
  await sqliteRun(
    `
    DELETE FROM boards
    WHERE id = ?;
  `,
    [id],
  );
};

export const getOneBoard = async (id: string): Promise<Board> => {
  const data = await sqliteGet(
    `
    SELECT * FROM boards
    WHERE id = ?
  `,
    [id],
  );

  return data as Board;
};

export const getManyBoards = async (): Promise<Board[]> => {
  const data = await sqliteAll(
    `
    SELECT * FROM boards
  `,
  );

  return data as Board[];
};
