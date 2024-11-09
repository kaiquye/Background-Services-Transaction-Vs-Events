import OrderModel from '../../../../domain/order/OrderModel';

export interface IOrderRepository {
  save(order: OrderModel): Promise<OrderModel>;
}
