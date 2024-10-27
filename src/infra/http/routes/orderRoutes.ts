import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { CheckoutOrderRequestDto } from '../controllers/dtos/checkoutOrderDto';
import { DtoValidator } from '../validators/dtoValidator';

const orderController = new OrderController();
const orderRouter = Router();

orderRouter.post(
  '/order',
  DtoValidator(CheckoutOrderRequestDto),
  orderController.CheckoutOrder
);

export default orderRouter;
