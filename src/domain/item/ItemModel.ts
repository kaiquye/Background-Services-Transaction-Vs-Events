import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import OrderModel from '../order/OrderModel';

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

  @ManyToOne(() => OrderModel, (orderModel) => orderModel.items)
  public order: OrderModel;
}
