/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import request from 'supertest';
import express from 'express';
import productStyles from '../src/controllers/productStyles.js';
import product from './product.json';

const app = express();
app.get('/products/:product_id/styles', productStyles);

describe('ProductStyles (/products/:product_id/styles) endpoint test', () => {
  test('it should retrieve the styles for product #64620', async () => {
    const res = await request(app).get('/products/64620/styles');

    expect(res.statusCode).toEqual(200);
    expect(res.body.product_id).toEqual('64620');
    expect(res.body.results).toEqual(product.styles);
  });
});
