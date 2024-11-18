import OrderModel from '../../../domain/order/orderModel';
import { DomainEvent } from '../../../infra/queue/interfaces/domainEvent.interface';

export class PaymentConfirmedEvent extends DomainEvent {
  public order: OrderModel;

  constructor(order: OrderModel) {
    super('PAYMENT_CONFIRMEED_EVENT', new Date());
    this.order = order;
  }
}
