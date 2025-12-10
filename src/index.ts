import express from 'express';
import {PORT} from "./config.ts";
import {cardsRouter} from "./routers/cards.router.ts";

const server = express();

server.use(express.json());

server.use('/cards', cardsRouter);

server.listen(PORT);