import http from 'k6/http';
import { sleep } from 'k6';

const productStylesTest = () => {
  const endpoint = 'http://127.0.0.1:3500/products';

  const responses = http.batch([
    ['GET', `${endpoint}/64620/styles`],
    ['GET', `${endpoint}/928303/styles`],
    ['GET', `${endpoint}/800123/styles`],
    ['GET', `${endpoint}/1000001/styles`],
  ]);

  // http.get('http://127.0.0.1:3500/products/928303/styles');
  sleep(1);
};

export default productStylesTest;
