import { randomUUID } from 'crypto';
import OrderModel from '../../../domain/order/orderModel';
import { OrderStatusEnum } from '../../../domain/order/orderStatusEnum';
import { IPaymentsGetaway } from '../../../infra/external-services/interfaces/paymentsGetaway.interface';
import { IPostalGetaway } from '../../../infra/external-services/interfaces/postalGetaway.interface';
import { dataSource } from '../../../infra/typeorm/config';
import { ApiResponse } from '../../../structure/apiResponse';
import { register } from '../../../structure/register';
import IItemRepository from '../repositories/interfaces/itemRepository.interface';
import { IOrderRepository } from '../repositories/interfaces/orderRepository.interface';
import { UseCase } from '../../../structure/useCase';

export class CheckoutOrderExemple1UseCase implements ICheckoutOrderUseCase {
  private orderRepository: IOrderRepository;
  private itemRepository: IItemRepository;
  private paymentsGetaway: IPaymentsGetaway;
  private postalGetaway: IPostalGetaway;

  constructor() {
    this.orderRepository = register.getInstance('order-repository');
    this.itemRepository = register.getInstance('item-repository');
    this.paymentsGetaway = register.getInstance('payments-getaway');
    this.postalGetaway = register.getInstance('postal-getaway');
  }

  async perform(input: Input): Promise<ApiResponse<Output>> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    const initOrder = new OrderModel();
    initOrder.status = OrderStatusEnum.PENDING;
    initOrder.orderDate = new Date();
    initOrder.totalAmount = 0;

    const itemIds = input.items.map((item) => item.id);
    const dbItemList = await this.itemRepository.findAllByItemIdList(itemIds);

    for (const requestItemId of itemIds) {
      const itemFound = dbItemList.find((dbItem) => dbItem.id === requestItemId);
      if (!itemFound) {
        throw ApiResponse.NOT_FOUND('item not found: ' + requestItemId);
      }
    }
    initOrder.items = dbItemList;

    let amount = 0;

    for (const elementDbItem of dbItemList) {
      const quantity = input.items.find((item) => (item.id = elementDbItem.id)).quantity;

      if (quantity > elementDbItem.quantity) {
        throw ApiResponse.CONFLICT(
          `Requested quantity for item ${elementDbItem.name} exceeds available stock.`
        );
      }

      amount = elementDbItem.amount * quantity;
    }
    initOrder.totalAmount = amount;

    // VERIFY PAYMENTS
    const idempotencyKey = randomUUID();
    await this.paymentsGetaway.processPayments(idempotencyKey, input.card, amount.toString());

    const paymentSuccess = await this.paymentsGetaway.verifyStatus(idempotencyKey);

    if (!paymentSuccess) {
      initOrder.status = OrderStatusEnum.FAILED;
      await this.orderRepository.save(initOrder);
      await queryRunner.commitTransaction();
      throw ApiResponse.INTERNAL_SERVER_ERROR('Payment processing failed. Please try again.');
    }

    // CREATE ORDER
    initOrder.status = OrderStatusEnum.CONFIRMED;
    const orderDb = await this.orderRepository.save(initOrder);

    // SHIP ORDER0
    if (paymentSuccess) {
      const posted = await this.postalGetaway.postingReceipt(orderDb.id, null, null);
      if (!posted) {
        initOrder.status = OrderStatusEnum.FAILED;
        await this.orderRepository.save(initOrder);
        await queryRunner.commitTransaction();
        throw ApiResponse.INTERNAL_SERVER_ERROR('Error while posting receipt: ' + orderDb);
      }
    }

    await queryRunner.commitTransaction();
    return ApiResponse.CREATED(orderDb);
  }
}

export type Input = {
  items: [
    {
      id: number;
      quantity: number;
    }
  ];
  card: {
    brand: string;
    cvv: string;
    number: string;
  };
};

export type Output = OrderModel;

export type ICheckoutOrderUseCase = UseCase<Input, Promise<ApiResponse<Output>>>;
