import { describe, it, before, after } from 'node:test';
import request from 'supertest';
import main from '../main';
import { ICheckoutOrderRequestDto } from '../infra/http/controllers/dtos/checkoutOrderDto';
import assert from 'node:assert';
import AppDataSource from '../infra/typeorm/config';
import { register } from '../structure/register';
import OrderModel from '../domain/order/OrderModel';

describe('order controller', () => {
  before(async () => {
    console.log('START');
    // run migrations
    // iniciar seeds
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    const orderRepo = await AppDataSource.getRepository(OrderModel);
    await orderRepo.save({
      orderDate: new Date(),
      status: 'INITIAL',
      totalAmount: 100
    });
  });

  after(async () => {
    console.log('END');
    // apenas excluir os dados do banco de dados
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it('should a register new order', async () => {
    const input: ICheckoutOrderRequestDto = {
      items: [
        {
          id: 1,
          quantity: 10
        }
      ],
      card: {
        brand: 'brand',
        cvv: '000',
        number: '100'
      }
    };

    const response = await request(main).post('/v1/order').send(input);

    console.log(response.body);

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.orderId, 1);
  });

  it('should return item not found', () => {});

  it('should return invalid card', () => {});
});
