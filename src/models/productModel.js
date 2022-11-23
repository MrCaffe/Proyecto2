import { Schema } from "mongoose";

const productCollection = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 1 },
  timestamp: String,
  }, {
  virtuals: true
});

productSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    delete response.__v;
    return response;
  },
});

export const productModel = { productCollection, productSchema };
