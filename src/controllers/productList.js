/* eslint-disable import/extensions */
import Product from '../db.js';

const productList = async (req, res) => {
  const { count } = req.query || 5;
  const { page } = req.query || 1;

  const productCount = await Product.estimatedDocumentCount();

  if (productCount < ((page * count) - (count - 1))) {
    res.status(404).send('page limit exceeded');
  } else {
    const startId = (page * count) - (count - 1);
    const endId = (page * count);

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

    res.status(200).json(products);
  }
};

export default productList;
