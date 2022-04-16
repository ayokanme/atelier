import http from 'k6/http';
import { sleep } from 'k6';

const productListTest = () => {
  const endpoint = 'http://127.0.0.1:3500/products';

  const responses = http.batch([
    ['GET', `${endpoint}?page=200000`],
    ['GET', `${endpoint}?page=18000&count=10`],
    ['GET', `${endpoint}?page=19000&count=10`],
    ['GET', `${endpoint}?page=18500&count=10`],
  ]);
  sleep(1);
};

export default productListTest;
