import { object, string, array, number } from 'yup';

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
