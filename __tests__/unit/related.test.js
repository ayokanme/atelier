/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import request from 'supertest';
import express from 'express';
import relatedProducts from '../../src/controllers/relatedProducts.js';
import product from './product.json';

const app = express();
app.get('/products/:product_id/related', relatedProducts);

describe('RelatedProducts (/products/:product_id/related) endpoint test', () => {
  test('it should retrieve the related product IDs for product #64620', async () => {
    const res = await request(app).get('/products/64620/related');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(product.related);
  });

  test('it should return an error when the parameter type is not a number', async () => {
    const res = await request(app).get('/products/productId/related');

    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('wrong parameter type');
  });

  test('it should return an error when the specified product ID does not exist', async () => {
    const res = await request(app).get('/products/2002000/related');

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('product with that ID does not exist');
  });
});
