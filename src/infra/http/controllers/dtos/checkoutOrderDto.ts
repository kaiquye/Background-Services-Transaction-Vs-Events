import { object, string, array, number } from 'yup';

export type ICheckoutOrderRequestDto = {
  card: {
    number: string;
    cvv: string;
    brand: string;
  };
  items: Array<{
    id: number;
    quantity: number;
  }>;
};

export const CheckoutOrderRequestDto = object({
  card: object({
    number: string().required(),
    cvv: string().required(),
    brand: string().required()
  }),
  items: array(
    object({
      id: number().required(),
      quantity: number().required().min(1)
    })
  )
    .required()
    .min(1)
});
