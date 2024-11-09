import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ItemModel from '../item/ItemModel';

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
  public status: string;

  @OneToMany(() => ItemModel, (itemModel) => itemModel.order)
  public items: Array<ItemModel>;
}
