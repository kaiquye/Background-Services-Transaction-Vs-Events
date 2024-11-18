import ItemModel from '../../../../domain/item/ItemModel';

export default interface IItemRepository {
  findAllByItemIdList(itemIdList: Array<number>): Promise<Array<ItemModel>>;
}
