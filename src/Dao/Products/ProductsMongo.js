import { ContainerMongo } from "../../Containers/ContainerMongo.js";
import {productModel} from "../../models/index.js"

export class ProductsMongo extends ContainerMongo {
  constructor(){
    super({
      name: productModel.productCollection,
      schema: productModel.productSchema
    })
  }
}