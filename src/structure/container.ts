import { OrderRepository as OrderRepository2 } from './../application/example_02_queues/repositories/order.repository';
import { register } from './register';
import { OrderRepository } from '../application/example_01_transaction/repositories/order.repository';
import ItemRepository from '../application/example_01_transaction/repositories/item.repository';
import { PaymentsGetaway } from '../infra/external-services/payments.gateway';
import { PostalGetaway } from '../infra/external-services/postal.getaway';
import { CheckoutOrderExemple1UseCase } from '../application/example_01_transaction/use-cases/checkout.use-case';
import { OrderController } from '../infra/http/controllers/orderController';
import { PostalUseCase } from '../application/example_02_queues/use-cases/postal.use-case';
import { PaymentUseCase } from '../application/example_02_queues/use-cases/payment.use-case';
import { CheckoutOrderExemple2UseCase } from '../application/example_02_queues/use-cases/checkout.use-case';
import eventQueue from '../infra/queue/event.queue';

// repositories
register.register('order-repository', OrderRepository);
register.register('order-repository2', OrderRepository2);
register.register('item-repository', ItemRepository);
register.register('payments-getaway', PaymentsGetaway);
register.register('postal-getaway', PostalGetaway);
register.register('event-queue', eventQueue);

//use cases
register.register('checkout-order-exemple1-use-case', CheckoutOrderExemple1UseCase);
register.register('checkout-order-exemple2-use-case', CheckoutOrderExemple2UseCase);

register.register('postal-use-case', PostalUseCase);
register.register('payment-use-case', PaymentUseCase);

//ontrollers
register.register('order-controller', OrderController);
