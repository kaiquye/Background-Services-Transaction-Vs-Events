import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import ItemModel from '../item/ItemModel';
import { OrderStatusEnum } from './orderStatusEnum';

@Entity({
  name: 'order'
})
export default class OrderModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'date', nullable: false })
  public orderDate: Date;

  @Column({ type: 'int', nullable: false })
  public totalAmount: number;

  @Column({ type: 'varchar', nullable: false })
  public status: OrderStatusEnum;

  @ManyToMany(() => ItemModel)
  @JoinTable()
  public items: Array<ItemModel>;
}
