import type { Card } from '../types/cards/index.ts';
import { sqliteAll, sqliteGet, sqliteRun } from './db-connection.ts';
import type { CardIdParams, ColumnIdParams } from '../types/common/index.ts';

export const createCard = async (card: Card): Promise<void> => {
  await sqliteRun(
    `
    INSERT INTO cards (id, text, column_id)
    VALUES (?, ?, ?);
  `,
    [card.id, card.text, card.columnId],
  );
};

export const updateCard = async (card: Card): Promise<void> => {
  await sqliteRun(
    `
    UPDATE cards SET text = ?, column_id = ?
    WHERE id = ?;
  `,
    [card.text, card.columnId, card.id],
  );
};

export const deleteCard = async (id: string): Promise<void> => {
  await sqliteRun(
    `
    DELETE FROM cards
    WHERE id = ?;
  `,
    [id],
  );
};

export const getOneCard = async ({
  cardId,
  columnId,
  boardId,
}: CardIdParams): Promise<Card> => {
  const data = await sqliteGet(
    `
    SELECT cards.id, cards.text, cards.column_id AS "columnId" 
    FROM cards LEFT JOIN columns
    ON cards.column_id = columns.id
    WHERE cards.id = ? AND columns.id = ? AND columns.board_id = ?
  `,
    [cardId, columnId, boardId],
  );

  return data as Card;
};

export const getManyCards = async ({
  boardId,
  columnId,
}: ColumnIdParams): Promise<Card[]> => {
  const data = await sqliteAll(
    `
      SELECT cards.id, cards.text, cards.column_id AS "columnId"
      FROM cards LEFT JOIN columns
      ON cards.column_id = columns.id
      WHERE columns.id = ? AND columns.board_id = ?
  `,
    [columnId, boardId],
  );

  return data as Card[];
};
