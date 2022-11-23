import { ProductDao } from "../../Dao/index.js";
import { DATE_UTILS, JOI_VALIDATOR } from "../../utils/index.js";

const getAll = async (req, res) => {
  try {
    const product = await ProductDao.getAll();
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDao.getById(id);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

const saveProduct = async (req, res) => {
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      timestamp: DATE_UTILS.getTimestamp(),
    });

    const createdProduct = await ProductDao.save(product);

    res.send(createdProduct);
  } catch (error) {
    res.send(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, code, thumbnail, price, stock } = req.body;

    const product = await JOI_VALIDATOR.product.validateAsync({
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      timestamp: DATE_UTILS.getTimestamp(),
    });

    const modifiedProduct = await ProductDao.updateById(id, product);
    res.send(modifiedProduct);
  } catch (error) {
    res.send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductDao.deleteById(id);
    res.send({ success: true });
  } catch (error) {
    res.send({ error, success: false });
  }
};
const deleteAllProducts = async (req, res) => {
  try {
    await ProductDao.deleteAll();
    res.send({ success: true });
  } catch (error) {
    res.send({ error, success: false });
  }
};

export const ProductController = {
  getAll,
  getById,
  saveProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
