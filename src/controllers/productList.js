/* eslint-disable import/extensions */
import Product from '../db.js';

const productList = async (req, res) => {
  const itemCount = req.query.count || 5;
  const pageNumber = req.query.page || 1;

  const count = Number(itemCount);
  const page = Number(pageNumber);

  if (Number.isNaN(count) || Number.isNaN(page)) {
    res.status(404).send('wrong parameter type');
  } else {
    const productCount = await Product.estimatedDocumentCount();

    if (productCount < ((page * count) - (count - 1))) {
      res.status(404).send('page limit exceeded');
    } else {
      const startId = (page * count) - (count - 1);
      const endId = (page * count);

      try {
        const products = await Product.aggregate([
          {
            $match: {
              id: { $gte: startId, $lte: endId },
            },
          },
          {
            $project: {
              _id: false,
              styles: false,
              features: false,
              related: false,
            },
          },
        ]);

        if (products.length) {
          res.status(200).json(products);
        } else {
          res.status(400).send('no products available');
        }
      } catch (error) {
        console.log('server error: ', error);
        res.status(500).send('server error');
      }
    }
  }
};

export default productList;
