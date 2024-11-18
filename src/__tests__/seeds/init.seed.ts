import ItemModel from '../../domain/item/ItemModel';
import { dataSource } from '../../infra/typeorm/config';

export default class E2ESeed {
  private itemRepo = dataSource.getRepository(ItemModel);

  async runSeed() {
    const newItem = this.itemRepo.create({
      amount: 100,
      id: 1,
      name: 'mouse-pad',
      quantity: 10,
      description: 'mouse pad 80x90'
    });
    await this.itemRepo.save(newItem);
  }
}
