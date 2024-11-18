import OrderModel from '../../../domain/order/orderModel';
import { OrderStatusEnum } from '../../../domain/order/orderStatusEnum';
import { ApiResponse } from '../../../structure/apiResponse';
import { register } from '../../../structure/register';
import { UseCase } from '../../../structure/useCase';
import { IOrderRepository } from '../repositories/interfaces/orderRepository.interface';
import IItemRepository from '../repositories/interfaces/itemRepository.interface';
import { IEventQueue } from '../../../infra/queue/interfaces/eventQueue.interface';
import { CreateOrderEvent } from '../events/CreatedOrder.event';

export class CheckoutOrderExemple2UseCase implements ICheckoutUseCase {
  private orderRepository: IOrderRepository;
  private itemRepository: IItemRepository;
  private queue: IEventQueue;

  constructor() {
    this.orderRepository = register.getInstance('order-repository');
    this.itemRepository = register.getInstance('item-repository');
    this.queue = register.getInstance('event-queue');
  }
  async perform(input: Input): Promise<ApiResponse<Output>> {
    const itemIds = input.items.map((item) => item.id);
    const dbItemList = await this.itemRepository.findAllByItemIdList(itemIds);

    for (const requestItemId of itemIds) {
      const itemFound = dbItemList.find((dbItem) => dbItem.id === requestItemId);
      if (!itemFound) {
        throw ApiResponse.NOT_FOUND('item not found: ' + requestItemId);
      }
    }

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

    const initOrder = new OrderModel();
    initOrder.orderDate = new Date();
    initOrder.items = dbItemList;
    initOrder.totalAmount = amount;
    initOrder.status = OrderStatusEnum.PENDING;

    const orderDb = await this.orderRepository.save(initOrder);

    // EVENT
    const CreatedOrderEvent = new CreateOrderEvent(orderDb, {
      ...input.card,
      amount: amount.toString()
    });
    this.queue.publish(CreatedOrderEvent);

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

export type ICheckoutUseCase = UseCase<Input, Promise<ApiResponse<Output>>>;
