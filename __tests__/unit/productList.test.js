/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import request from 'supertest';
import express from 'express';
import productList from '../../src/controllers/productList.js';
import product from './product.json';

const app = express();
app.get('/products', productList);

describe('ProductList (/products) endpoint test', () => {
  test('it should retrieve 5 product objects from the db when no parameters are specified', async () => {
    const res = await request(app).get('/products');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(5);
  });

  test('it should retrieve 30 product objects from the db when 30 results/page is specified', async () => {
    const res = await request(app).get('/products?page=2&count=30');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(30);
  });

  test('it should include product #64620 when only page #12924 is specified', async () => {
    const res = await request(app).get('/products?page=12924');

    const containsCorrectProduct = res.body.findIndex((item) => item.id === product.id) > -1;

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(5);
    expect(containsCorrectProduct).toEqual(true);
  });

  test('it should include product #64620 when page #4971 and 13 results/page is specified', async () => {
    const res = await request(app).get('/products?page=4971&count=13');

    const containsCorrectProduct = res.body.findIndex((item) => item.id === product.id) > -1;

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(13);
    expect(containsCorrectProduct).toEqual(true);
  });

  test('it should return an error when the page limit is exceeded', async () => {
    const res = await request(app).get('/products?page=10002&count=100');

    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('page limit exceeded');
  });

  test('it should return an error when the parameter type is not a number', async () => {
    const res = await request(app).get('/products?page=page_num&count=item_count');

    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual('wrong parameter type');
  });
});
