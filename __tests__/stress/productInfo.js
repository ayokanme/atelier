import http from 'k6/http';
import { sleep } from 'k6';

const productInfoTest = () => {
  const endpoint = 'http://127.0.0.1:3500/products';

  const responses = http.batch([
    ['GET', `${endpoint}/64620`],
    ['GET', `${endpoint}/928303`],
    ['GET', `${endpoint}/800123`],
    ['GET', `${endpoint}/1000001`],
  ]);

  // http.get('http://127.0.0.1:3500/products/928303');
  sleep(1);
};

export default productInfoTest;
