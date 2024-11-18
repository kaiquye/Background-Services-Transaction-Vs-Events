import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import OrderModel from '../order/orderModel';

@Entity({
  name: 'item'
})
export default class ItemModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @Column({ type: 'varchar', nullable: false })
  public description: string;

  @Column({ type: 'int', nullable: false })
  public amount: number;

  @Column({ type: 'int', nullable: false })
  public quantity: number;

  public order: Array<OrderModel>;
}
