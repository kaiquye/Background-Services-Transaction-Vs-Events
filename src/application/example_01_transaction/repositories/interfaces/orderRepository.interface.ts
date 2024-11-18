import OrderModel from '../../../../domain/order/orderModel';

export interface IOrderRepository {
  save(order: OrderModel): Promise<OrderModel>;
}
