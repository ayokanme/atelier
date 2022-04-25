/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@54.235.2.186:27017/products-api?authSource=products-api`)
  .then(() => {
    console.log('Connected to products database');
  })
  .catch((err) => {
    console.log('Unable to connect to database. ERROR: ', err);
  });

const featuresSchema = new mongoose.Schema({
  feature: String,
  value: String,
});

const stylesPhotoSchema = new mongoose.Schema({
  thumbnail_url: String,
  url: String,
});

const stylesSchema = new mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Boolean,
  photos: [stylesPhotoSchema],
  skus: {
    type: Map,
    of: new mongoose.Schema({
      quantity: Number,
      size: String,
    }),
  },
});

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [featuresSchema],
  styles: [stylesSchema],
  related: [Number],
});

// productSchema.index({ 'styles.style_id': 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
