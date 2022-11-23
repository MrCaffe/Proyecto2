import { Schema } from "mongoose";

const cartCollection = "carts";

const cartSchema = new Schema(
  {
    timestamp: String,
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  },
  {
    virtuals: true,
  }
);

cartSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    delete response.__v;
    return response;
  },
});

export const cartModel = { cartCollection, cartSchema };
