/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import request from 'supertest';
import express from 'express';
import productInfo from '../src/controllers/productInfo.js';
import product from './product.json';

const app = express();
app.get('/products/:product_id', productInfo);

describe('ProductInfo (/products/:product_id) endpoint test', () => {
  test('retrieves product info for product #64620', async () => {
    const res = await request(app).get('/products/64620');
    const received = res.body[0];

    expect(res.statusCode).toEqual(200);
    expect(received.id).toEqual(product.id);
    expect(received.name).toEqual(product.name);
    expect(received.slogan).toEqual(product.slogan);
    expect(received.description).toEqual(product.description);
    expect(received.category).toEqual(product.category);
    expect(received.default_price).toEqual(product.default_price);
    expect(received.features).toStrictEqual(product.features);
  });
});
