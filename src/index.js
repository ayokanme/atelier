/* eslint-disable import/extensions */
import express from 'express';
import productList from './controllers/productList.js';
import productInfo from './controllers/productInfo.js';
import productStyles from './controllers/productStyles.js';
import relatedProducts from './controllers/relatedProducts.js';

const app = express();
const port = 3500;

app.use(express.json());

// ROUTES
app.get('/products', productList);

app.get('/products/:product_id', productInfo);

app.get('/products/:product_id/styles', productStyles);

app.get('/products/:product_id/related', relatedProducts);

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
