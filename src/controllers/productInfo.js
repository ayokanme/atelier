/* eslint-disable import/extensions */
import Product from '../db.js';

const productInfo = async (req, res) => {
  const productId = Number(req.params.product_id);

  if (Number.isNaN(productId)) {
    res.status(404).send('wrong parameter type');
  }

  try {
    const productData = await Product.aggregate([
      {
        $match: {
          id: productId,
        },
      },
      {
        $project: {
          _id: false,
          styles: false,
          related: false,
        },
      },
    ]);

    if (productData.length > 0) {
      res.status(200).json(productData);
    } else {
      res.status(400).send('product with that ID does not exist');
    }
  } catch (error) {
    console.log('server error: ', error);
    res.status(500).send('server error');
  }
};

export default productInfo;
