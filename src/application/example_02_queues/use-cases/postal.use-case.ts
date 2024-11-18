import { UseCase } from '../../../structure/useCase';
import { PaymentConfirmedEvent } from '../events/PaymentConfirmed.event';
import { IPostalGetaway } from '../../../infra/external-services/interfaces/postalGetaway.interface';
import { register } from '../../../structure/register';
import { IOrderRepository } from '../repositories/interfaces/orderRepository.interface';
import { OrderStatusEnum } from '../../../domain/order/orderStatusEnum';

export class PostalUseCase implements IPostalUseCase {
  private postalGetaway: IPostalGetaway;
  private orderRepository: IOrderRepository;

  constructor() {
    this.postalGetaway = register.getInstance('postal-getaway');
    this.orderRepository = register.getInstance('order-repository');
  }

  async perform(input: PostalIn) {
    const orderFound = await this.orderRepository.findById(input.order.id);
    if (!orderFound) {
      // lancar event de error (usar no 3 exemplo com saga)
      return;
    }

    const posted = await this.postalGetaway.postingReceipt(input.order.id, null, null);
    if (!posted) {
      orderFound.status = OrderStatusEnum.POSTAL_FAILED;
      await this.orderRepository.save(orderFound);

      // lancar event de error (usar no 3 exemplo com saga)
      return;
    }

    orderFound.status = OrderStatusEnum.SHIPPED;
    await this.orderRepository.save(orderFound);
  }
}

export type PostalIn = PaymentConfirmedEvent;

export type IPostalUseCase = UseCase<unknown, void>;
