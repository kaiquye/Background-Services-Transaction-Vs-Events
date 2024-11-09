import express from 'express';
import orderRouter from './routes/orderRoutes';

const server = express();

server.use(express.json());
server.use('/v1', orderRouter);

export default server;
