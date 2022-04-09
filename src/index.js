/* eslint-disable no-console */
import express from 'express';
import productList from './controllers/productList';
import productInfo from './controllers/productInfo';
import productStyles from './controllers/productStyles';
import relatedProducts from './controllers/relatedProducts';

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
