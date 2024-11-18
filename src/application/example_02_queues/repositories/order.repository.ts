import { Repository } from 'typeorm';
import { IOrderRepository } from './interfaces/orderRepository.interface';
import { dataSource } from '../../../infra/typeorm/config';
import OrderModel from '../../../domain/order/orderModel';

export class OrderRepository implements IOrderRepository {
  private db: Repository<OrderModel>;

  constructor() {
    this.db = dataSource.getRepository(OrderModel);
  }

  async findById(orderId: number): Promise<OrderModel> {
    return await this.db.findOneBy({
      id: orderId
    });
  }

  async save(order: OrderModel): Promise<OrderModel> {
    const newOrder = this.db.create(order);
    return await this.db.save(newOrder);
  }
}
