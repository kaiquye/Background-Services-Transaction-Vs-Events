import { Repository } from 'typeorm';
import OrderModel from '../../../domain/order/OrderModel';
import AppDataSource from '../../../infra/typeorm/config';
import { IOrderRepository } from './interfaces/orderRepository.interface';

export class OrderRepository implements IOrderRepository {
  private db: Repository<OrderModel>;

  constructor() {
    this.db = AppDataSource.getRepository(OrderModel);
  }

  async save(order: OrderModel): Promise<OrderModel> {
    return await this.db.save(order);
  }
}
