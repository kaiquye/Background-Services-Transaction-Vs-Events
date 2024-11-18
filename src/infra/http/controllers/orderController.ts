import { ICheckoutOrderUseCase } from '../../../application/example_01_transaction/use-cases/checkout.use-case';
import { ICheckoutUseCase } from '../../../application/example_02_queues/use-cases/checkout.use-case';
import { register } from '../../../structure/register';

export class OrderController {
  private checkoutOrderExemple1UseCase: ICheckoutOrderUseCase;
  private checkoutOrderExemple2UseCase: ICheckoutUseCase;

  constructor() {
    this.checkoutOrderExemple1UseCase = register.getInstance('checkout-order-exemple1-use-case');
    this.checkoutOrderExemple2UseCase = register.getInstance('checkout-order-exemple2-use-case');
  }

  async checkoutOrderExemple1(req, res, next) {
    try {
      const body = req.body;
      const response = await this.checkoutOrderExemple1UseCase.perform(body);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }

  async checkoutOrderExemple2(req, res, next) {
    try {
      const body = req.body;
      const response = await this.checkoutOrderExemple2UseCase.perform(body);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
