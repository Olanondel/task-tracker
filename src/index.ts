import express from 'express';
import { ADMIN_LOGIN, ADMIN_PASSWORD, PORT } from './config.ts';
import { cardsRouter } from './routers/cards.router.ts';
import { createTables } from './database/create-tables.ts';
import expressBasicAuth from 'express-basic-auth';
import { logger } from './logger.ts';
import { boardsRouter } from './routers/boards.router.ts';
import { columnsRouter } from './routers/columns.router.ts';

async function run() {
  await createTables();

  const server = express();

  server.use(
    expressBasicAuth({
      users: { [ADMIN_LOGIN]: ADMIN_PASSWORD },
      challenge: true,
    }),
  );

  server.use(express.json());
  server.use(logger);

  server.use('/boards', boardsRouter);
  server.use('/boards/:boardId/columns', columnsRouter);
  server.use('/boards/:boardId/columns/:columnId/cards', cardsRouter);

  server.listen(PORT);
}

run().catch((err) => console.error(err));
