/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import request from 'supertest';
import express from 'express';
import relatedProducts from '../src/controllers/relatedProducts.js';
import product from './product.json';

const app = express();
app.get('/products/:product_id/related', relatedProducts);

describe('RelatedProducts (/products/:product_id/related) endpoint test', () => {
  test('it should retrieve the related product IDs for product #64620', async () => {
    const res = await request(app).get('/products/64620/related');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(product.related);
  });
});
