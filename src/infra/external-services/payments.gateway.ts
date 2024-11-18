import { IPaymentsGetaway } from './interfaces/paymentsGetaway.interface';

export class PaymentsGetaway implements IPaymentsGetaway {
  processPayments(
    IdempotencyKey: any,
    card: { brand: string; cvv: string; number: string },
    amount: number
  ) {
    return 'PENDING';
  }

  verifyStatus(idempotencyKey: string): string {
    // Lógica para verificar status do pagamento
    return 'SUCCESS';
  }
}
