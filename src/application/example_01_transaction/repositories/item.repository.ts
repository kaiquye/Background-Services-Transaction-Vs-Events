import { In, Repository } from 'typeorm';
import IItemRepository from './interfaces/itemRepository.interface';
import ItemModel from '../../../domain/item/ItemModel';
import { dataSource } from '../../../infra/typeorm/config';

export default class ItemRepository implements IItemRepository {
  private db: Repository<ItemModel>;

  constructor() {
    this.db = dataSource.getRepository(ItemModel);
  }
  async findAllByItemIdList(itemIdList: Array<number>): Promise<Array<ItemModel>> {
    return this.db.findBy({
      id: In<number>(itemIdList)
    });
  }
}
