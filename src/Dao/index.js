import { config } from "../config/index.js";
import { ContainerMongo } from "../Containers/index.js";
import { MongoDBService } from "../services/MongoDBService/index.js";
import { CartsMongo } from "./Carts/index.js";
import { ProductsMongo } from "./Products/index.js";

//const CartDao = new ContainerFilesystem(config.DATABASES.filesystem.PRODUCTS_FILENAME);
//const CartDao = new ContainerFilesystem(config.DATABASES.filesystem.CARTS_FILENAME);

const SELECTED_DATABASE = "mongo";

const getSelectedDaos = () => {
  switch (SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDao: new ProductsMongo(),
        CartsDao: new CartsMongo(),
      };
    }
  }
};

const { CartsDao, ProductDao } = getSelectedDaos();

export { CartsDao, ProductDao };
