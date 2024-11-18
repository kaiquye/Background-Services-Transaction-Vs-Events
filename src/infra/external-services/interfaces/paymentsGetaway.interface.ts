export interface IPaymentsGetaway {
  processPayments(
    IdempotencyKey,
    card?: { brand: string; cvv: string; number: string },
    amount?: string
  );
  verifyStatus(IdempotencyKey);
}
