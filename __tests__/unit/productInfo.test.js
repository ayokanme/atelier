/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import request from 'supertest';
import express from 'express';
import productInfo from '../../src/controllers/productInfo.js';
import product from './product.json';

const app = express();
app.get('/products/:product_id', productInfo);

describe('ProductInfo (/products/:product_id) endpoint test', () => {
  test('it should retrieve product info for product #64620', async () => {
    const res = await request(app).get('/products/64620');
    const received = res.body;
    const {
      id, name, slogan, description, category, default_price, features,
    } = product;

    expect(res.statusCode).toEqual(200);
    expect(received.id).toEqual(id);
    expect(received.name).toEqual(name);
    expect(received.slogan).toEqual(slogan);
    expect(received.description).toEqual(description);
    expect(received.category).toEqual(category);
    expect(received.default_price).toEqual(default_price);
    expect(received.features).toEqual(features);
  });

  test('it should return an error when the parameter type is not a number', async () => {
    const res = await request(app).get('/products/productId');

    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('wrong parameter type');
  });

  test('it should return an error when the specified product ID does not exist', async () => {
    const res = await request(app).get('/products/2002000');

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('product with that ID does not exist');
  });
});
