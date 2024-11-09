import { Request, Response } from 'express';
import { ICheckoutOrderUseCase } from '../../../application/example_01_transaction/use-cases/checkoutOrder.use-case';
import { register } from '../../../structure/register';

export class OrderController {
  private checkoutOrderUseCase: ICheckoutOrderUseCase;

  constructor() {
    this.checkoutOrderUseCase = register.getInstance('checkout-order-use-case');
  }

  async checkoutOrder(req: Request, res: Response) {
    const body = req.body;

    const response = await this.checkoutOrderUseCase.perform(body);

    res.status(200).json(response);
  }
}
