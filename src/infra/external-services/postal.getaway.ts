import { IPostalGetaway } from './interfaces/postalGetaway.interface';

export class PostalGetaway implements IPostalGetaway {
  postingReceipt(orderId: any, personInfo: any, addressInfo: any) {
    return true;
  }
}
