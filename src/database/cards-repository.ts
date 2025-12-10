import type { Card } from '../types/cards/index.ts';
import { sqliteAll, sqliteGet, sqliteRun } from './db-connection.ts';

export const createCard = async (card: Card): Promise<void> => {
  await sqliteRun(
    `
    INSERT INTO cards (id, text)
    VALUES (?, ?);
  `,
    [card.id, card.text],
  );
};

export const updateCard = async (card: Card): Promise<void> => {
  await sqliteRun(
    `
    UPDATE cards SET text = ?
    WHERE id = ?;
  `,
    [card.text, card.id],
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

export const getOneCard = async (id: string): Promise<Card> => {
  const data = await sqliteGet(
    `
    SELECT * FROM cards
    WHERE id = ?
  `,
    [id],
  );

  return data as Card;
};

export const getManyCards = async (): Promise<Card[]> => {
  const data = await sqliteAll(
    `
    SELECT * FROM cards
  `,
  );

  return data as Card[];
};
