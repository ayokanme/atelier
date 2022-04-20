import http from 'k6/http';
import { sleep } from 'k6';

const relatedProductsTest = () => {
  const endpoint = 'http://127.0.0.1:3500/products';

  const responses = http.batch([
    ['GET', `${endpoint}/64620/related`],
    ['GET', `${endpoint}/928303/related`],
    ['GET', `${endpoint}/800123/related`],
    ['GET', `${endpoint}/1000001/related`],
  ]);

  // http.get('http://127.0.0.1:3500/products/928303/related');
  sleep(1);
};

export default relatedProductsTest;
