/* eslint-disable import/extensions */
import Product from '../db.js';

const relatedProducts = async (req, res) => {
  const productId = Number(req.params.product_id);

  if (Number.isNaN(productId)) {
    res.status(404).send('wrong parameter type');
  } else {
    try {
      const response = await Product.aggregate([
        {
          $match: {
            id: productId,
          },
        },
        {
          $project: { related: true },
        },
        {
          $project: { _id: false },
        },
      ]);

      if (response.length) {
        res.status(200).json(response[0].related);
      } else {
        res.status(400).send('product with that ID does not exist');
      }
    } catch (error) {
      console.log('server error: ', error);
      res.status(500).send('server error');
    }
  }
};

export default relatedProducts;
