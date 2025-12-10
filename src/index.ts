import express from 'express';
import { PORT } from './config.ts';
import { cardsRouter } from './routers/cards.router.ts';
import { createTables } from './database/create-tables.ts';

async function run() {
  await createTables();

  const server = express();

  server.use(express.json());

  server.get('/', (rq, rs) => {
    rs.send('<h1>body</h1>');
  });

  server.use('/cards', cardsRouter);

  server.listen(PORT);
}

run().catch((err) => console.error(err));
