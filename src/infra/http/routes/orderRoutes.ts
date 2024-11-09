import { Router } from 'express';
import { CheckoutOrderRequestDto } from '../controllers/dtos/checkoutOrderDto';
import { DtoValidator } from '../validators/dtoValidator';
import { register } from '../../../structure/register';

const orderRouter = Router();
const orderController = register.getInstance('order-controller');

orderRouter.post('/order', DtoValidator(CheckoutOrderRequestDto), (req, res) =>
  orderController.checkoutOrder(req, res)
);

export default orderRouter;
