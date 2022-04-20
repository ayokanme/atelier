/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import productList from './controllers/productList.js';
import productInfo from './controllers/productInfo.js';
import productStyles from './controllers/productStyles.js';
import relatedProducts from './controllers/relatedProducts.js';

const app = express();
const port = 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ROUTES
app.get('/', (req, res) => res.status(200).send('Welcome to the Products-API'));

app.get('/products', productList);

app.get('/products/:product_id', productInfo);

app.get('/products/:product_id/styles', productStyles);

app.get('/products/:product_id/related', relatedProducts);

app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}`);
});
