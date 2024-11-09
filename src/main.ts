import 'reflect-metadata';
import './structure/container';
import appDataSource from './infra/typeorm/config';
import server from './infra/http/server';

appDataSource
  .initialize()
  .then(() => {
    server.listen(8080, () => console.log('start server...'));
  })
  .catch((er) => console.log('database error:' + er));

export default server;
