import { ContainerMongo } from "../../Containers/ContainerMongo.js";
import { cartModel } from "../../models/index.js";

export class CartsMongo extends ContainerMongo {
  constructor() {
    super({
      name: cartModel.cartCollection,
      schema: cartModel.cartSchema,
    });
  }

  async getById(id) {
    const response = await this.model.findById(id).populate("products");
    return response;
  }
}
