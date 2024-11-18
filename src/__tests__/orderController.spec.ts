import '../structure/container';
import { describe, it, before, after } from 'node:test';
import request from 'supertest';
import { ICheckoutOrderRequestDto } from '../infra/http/controllers/dtos/checkoutOrderDto';
import assert from 'node:assert';
import server from '../infra/server';
import dbSeed from '../__tests__/seeds/init.seed';
import { OrderStatusEnum } from '../domain/order/orderStatusEnum';
import { dataSource } from '../infra/typeorm/config';

// describe('order controller - exemple 1', () => {
//   let app;
//   const seed = new dbSeed();
//   before(async () => {
//     app = request(server);
//     await dataSource.initialize();
//     await seed.runSeed();
//   });

//   after(async () => {
//     dataSource.synchronize(true);
//   });

//   it('should a register new order', async () => {
//     const input: ICheckoutOrderRequestDto = {
//       items: [
//         {
//           id: 1,
//           quantity: 10
//         }
//       ],
//       card: {
//         brand: 'brand',
//         cvv: '000',
//         number: '100'
//       }
//     };

//     const response = await app.post('/v1/order').send(input);

//     assert.equal(response.statusCode, 200);
//     assert.equal(response.body?.data.id, 1);
//     assert.equal(response.body?.data.status, OrderStatusEnum.CONFIRMED);
//     assert.equal(response.body?.data.totalAmount, 1000);
//   });

//   it('should return error: quantity for item exceeds', async () => {
//     const input: ICheckoutOrderRequestDto = {
//       items: [
//         {
//           id: 1,
//           quantity: 220
//         }
//       ],
//       card: {
//         brand: 'brand',
//         cvv: '000',
//         number: '100'
//       }
//     };

//     const response = await app.post('/v1/order').send(input);

//     assert.equal(response.statusCode, 409);
//     assert.equal(
//       response.body.message,
//       'Requested quantity for item mouse-pad exceeds available stock.'
//     );
//   });

//   it('should return item not found', async () => {
//     const invalidItemId = 999;

//     const input: ICheckoutOrderRequestDto = {
//       items: [
//         {
//           id: invalidItemId,
//           quantity: 10
//         }
//       ],
//       card: {
//         brand: 'brand',
//         cvv: '000',
//         number: '100'
//       }
//     };

//     const response = await app.post('/v1/order').send(input);

//     assert.equal(response.statusCode, 404);
//     assert.equal(response.body.message, 'item not found: ' + invalidItemId);
//   });
// });

describe.only('order controller - exemple 2', () => {
  let app;
  const seed = new dbSeed();
  before(async () => {
    app = request(server);
    await dataSource.initialize();
    await seed.runSeed();
  });

  after(async () => {
    dataSource.synchronize(true);
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

    const response = await app.post('/v1/order/exemple/2').send(input);

    assert.equal(response.statusCode, 200);
    assert.equal(response.body?.data.id, 1);
    assert.equal(response.body?.data.status, OrderStatusEnum.PENDING);
    assert.equal(response.body?.data.totalAmount, 1000);
  });
});
