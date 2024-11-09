import { OrderRepository } from '../application/example_01_transaction/repositories/order.repository';
import { CheckoutOrderUseCase } from '../application/example_01_transaction/use-cases/checkoutOrder.use-case';
import { OrderController } from '../infra/http/controllers/orderController';
import { register } from './register';

register.register('order-repository', OrderRepository);
register.register('checkout-order-use-case', CheckoutOrderUseCase);
register.register('order-controller', OrderController);
