import { Request, Response } from 'express';

export class OrderController {
  private checkoutOrderUseCase: ICheckoutOrderUseCase;

  constructor() {
    this.checkoutOrderUseCase = new CheckoutOrderUseCase();
  }

  async CheckoutOrder(req: Request, res: Response) {
    const body = req.body;
  }
}
