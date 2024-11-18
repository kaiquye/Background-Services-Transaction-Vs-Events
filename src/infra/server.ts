import '../structure/container';
import express from 'express';
import orderRouter from './http/routes/orderRoutes';
import { errorHandler } from './http/validators/errorHandler';
import { register } from '../structure/register';
import { IEventQueue } from './queue/interfaces/eventQueue.interface';

const queue = register.getInstance<IEventQueue>('event-queue');

queue.consume('CREATED_ORDER_EVENT', 'payment-use-case');
queue.consume('PAYMENT_CONFIMED_EVENT', 'postal-use-case');

const server = express();

server.use(express.json());
server.use('/v1', orderRouter);
server.use(errorHandler);

export default server;
