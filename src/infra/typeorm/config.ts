import { DataSource } from 'typeorm';
import OrderModel from '../../domain/order/OrderModel';
import ItemModel from '../../domain/item/ItemModel';

let AppDataSource = null;

AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'database-background-services',
  entities: [OrderModel, ItemModel],
  synchronize: true,
  logging: false
});

export default AppDataSource;
