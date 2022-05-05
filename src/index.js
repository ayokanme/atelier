/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productList from './controllers/productList.js';
import productInfo from './controllers/productInfo.js';
import productStyles from './controllers/productStyles.js';
import relatedProducts from './controllers/relatedProducts.js';

dotenv.config();

const app = express();
const port = 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const welcomeMessage = `Welcome to the Products API for Atelier eCommerce!
  The available endpoints are:
    (1) /products params: (count) and (page)
    (2) /products/:product_id
    (3) /products/:product_id/styles
    (4) /products/:product_id/related`;

// ROUTES
app.get('/', (req, res) => res.status(200).send(welcomeMessage));

app.get('/products', productList);

app.get('/products/:product_id', productInfo);

app.get('/products/:product_id/styles', productStyles);

app.get('/products/:product_id/related', relatedProducts);

app.get(`/${process.env.LOADER_IO_VERIFICATION}`, (req, res) => {
  res.status(200).send(process.env.LOADER_IO_VERIFICATION);
});

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
