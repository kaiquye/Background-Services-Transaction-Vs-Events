import OrderModel from '../../../domain/order/orderModel';
import { DomainEvent } from '../../../infra/queue/interfaces/domainEvent.interface';

export class CreateOrderEvent extends DomainEvent {
  public order: OrderModel;
  public paymentDetails: {
    brand: string;
    cvv: string;
    number: string;
    amount: string;
  };

  constructor(
    order: OrderModel,
    paymentDetails: {
      amount: string;
      brand: string;
      cvv: string;
      number: string;
    }
  ) {
    super('CREATED_ORDER_EVENT', new Date());
    this.order = order;
    this.paymentDetails = paymentDetails;
  }
}
