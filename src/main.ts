import 'reflect-metadata';
import './structure/container';
import server from './infra/server';
import { dataSource } from './infra/typeorm/config';

const bootstrap = async () => {
  dataSource
    .initialize()
    .then(() => {
      server.listen(8082, () => console.log('start server...'));
    })
    .catch((er) => console.log('database error:' + er));
};

bootstrap();
export default bootstrap;
