import { ApiResponse } from '../../../structure/ApiResponse';
import { register } from '../../../structure/register';
import { UseCase } from '../../../structure/UseCase';
import { IOrderRepository } from '../repositories/interfaces/orderRepository.interface';

export class CheckoutOrderUseCase implements ICheckoutOrderUseCase {
  private orderRepository: IOrderRepository;

  constructor() {
    this.orderRepository = register.getInstance('order-repository');
  }

  async perform(input: Input): Promise<ApiResponse<Output>> {
    // buscar o user pelo cartao / verificar se o cartao esta cadastrado
    // verificar se os items existe;
    // verificar se ele ta ativo
    // enviar o pagamento
    // ficar esperando o pgamaento ser processador

    console.log(input);
    return null;
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

export type Output = {
  orderId: number;
};

export type ICheckoutOrderUseCase = UseCase<
  Input,
  Promise<ApiResponse<Output>>
>;
