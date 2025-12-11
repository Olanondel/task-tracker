import type { Column } from '../columns/index.ts';

export type GetBoardResponseCards = {
  id: string;
  text: string;
};

export type GetBoardResponseColumn = {
  id: string;
  name: string;
  cards: GetBoardResponseCards[];
};

export type GetBoardResponse = {
  id: string;
  name: string;
  columns: GetBoardResponseColumn[];
};
