import { sqliteAll, sqliteGet, sqliteRun } from './db-connection.ts';
import type { Board } from '../types/boards/board.ts';
import type {
  GetBoardResponse,
  GetBoardResponseColumn,
} from '../types/boards/index.ts';

type OneBoardDatabaseResult = {
  boardId: string;
  boardName: string;
  columnId: string | null;
  columnName: string | null;
  cardId: string | null;
  cardText: string | null;
};

const mapOneBoardResult = (
  result: OneBoardDatabaseResult[],
): GetBoardResponse => {
  const columns: GetBoardResponseColumn[] = [];
  let column: GetBoardResponseColumn | undefined;

  for (const row of result) {
    if (!row.columnId) break;

    if (!column) {
      column = {
        id: row.columnId!,
        name: row.columnName!,
        cards: [],
      };
    }

    if (column.id !== row.columnId) {
      columns.push(column);

      column = {
        id: row.columnId!,
        name: row.columnName!,
        cards: [],
      };
    }

    if (!row.cardId) continue;

    column.cards.push({
      id: row.cardId,
      text: row.cardText!,
    });
  }

  if (column) {
    columns.push(column);
  }

  if (!result.length) {
    throw new Error('Board not found');
  }

  return {
    id: result[0]!.boardId,
    name: result[0]!.boardName,
    columns,
  };
};

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

export const getOneBoard = async (id: string): Promise<GetBoardResponse> => {
  const data = await sqliteAll<OneBoardDatabaseResult>(
    `
    SELECT 
      boards.id AS "boardId",
      boards.name AS "boardName",
      columns.id AS "columnId",
      columns.name AS "columnName",
      cards.id AS "cardId",
      cards.text AS "cardText"
    FROM boards
    LEFT JOIN columns ON boards.id = columns.board_id
    LEFT JOIN cards ON columns.id = cards.column_id
    WHERE boards.id = ?
    ORDER BY columns.name ASC NULLS LAST, columns.id ASC, cards.text ASC NULLS LAST
  `,
    [id],
  );

  return mapOneBoardResult(data);
};

export const getManyBoards = async (): Promise<Board[]> => {
  return await sqliteAll<Board>(
    `
    SELECT * FROM boards
  `,
  );
};
