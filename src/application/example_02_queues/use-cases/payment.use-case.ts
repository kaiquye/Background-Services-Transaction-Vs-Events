import { UseCase } from '../../../structure/useCase';
import { register } from '../../../structure/register';
import { randomUUID } from 'crypto';
import { IPaymentsGetaway } from '../../../infra/external-services/interfaces/paymentsGetaway.interface';
import { CreateOrderEvent } from '../events/CreatedOrder.event';
import { IOrderRepository } from '../repositories/interfaces/orderRepository.interface';
import { OrderStatusEnum } from '../../../domain/order/orderStatusEnum';
import { IEventQueue } from '../../../infra/queue/interfaces/eventQueue.interface';
import { PaymentConfirmedEvent } from '../events/PaymentConfirmed.event';

export class PaymentUseCase implements IPaymentUseCase {
  private paymentsGetaway: IPaymentsGetaway;
  private orderRepository: IOrderRepository;
  private queue: IEventQueue;

  constructor() {
    this.paymentsGetaway = register.getInstance('payments-getaway');
    this.orderRepository = register.getInstance('order-repository2');
    this.queue = register.getInstance('event-queue');
  }

  async perform(event: CreateOrderEvent) {
    console.log('CHEGOU ');
    const idempotencyKey = randomUUID();
    await this.paymentsGetaway.processPayments(
      idempotencyKey,
      event.paymentDetails,
      event.paymentDetails.amount
    );
    const paymentSuccess = await this.paymentsGetaway.verifyStatus(idempotencyKey);

    const orderFound = await this.orderRepository.findById(event.order.id);
    if (!orderFound) {
      // lancar event de error (usar no 3 exemplo com saga)
      return;
    }

    if (!paymentSuccess) {
      orderFound.status = OrderStatusEnum.PAYMENYT_REFUNDED;
      await this.orderRepository.save(orderFound);

      // lancar event de error (usar no 3 exemplo com saga)
      return;
    }

    orderFound.status = OrderStatusEnum.PAYMENYT_CONFIRMED;
    await this.orderRepository.save(orderFound);

    // EVENT PAYMENT CONFIRMED
    const paymentConfirmedEvent = new PaymentConfirmedEvent(orderFound);
    this.queue.publish(paymentConfirmedEvent);
  }
}

export type PaymentIn = CreateOrderEvent;

export type IPaymentUseCase = UseCase<PaymentIn, void>;
