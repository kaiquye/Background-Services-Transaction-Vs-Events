import { Router } from 'express';
import { CheckoutOrderRequestDto } from '../controllers/dtos/checkoutOrderDto';
import { DtoValidator } from '../validators/dtoValidator';
import { register } from '../../../structure/register';
import { OrderController } from '../controllers/orderController';

const orderRouter = Router();
const orderController = register.getInstance<OrderController>('order-controller');

orderRouter.post('/order/exemple/1', DtoValidator(CheckoutOrderRequestDto), (req, res, next) =>
  orderController.checkoutOrderExemple1(req, res, next)
);
orderRouter.post('/order/exemple/2', DtoValidator(CheckoutOrderRequestDto), (req, res, next) =>
  orderController.checkoutOrderExemple2(req, res, next)
);

export default orderRouter;
