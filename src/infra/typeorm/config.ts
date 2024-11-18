import { DataSource } from 'typeorm';
import ItemModel from '../../domain/item/ItemModel';
import OrderModel from '../../domain/order/orderModel';

export const dataSource = new DataSource({
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
