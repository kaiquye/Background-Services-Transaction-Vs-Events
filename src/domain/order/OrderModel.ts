import { ItemModel } from '../item/itemModel';

export class OrderModel {
  public id: number;
  public orderDate: Date;
  public totalAmount: number;
  public status: string;
  public items: Array<ItemModel>;
}
