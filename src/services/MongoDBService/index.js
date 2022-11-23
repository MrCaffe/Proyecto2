import mongoose from "mongoose";
import { config } from "../../config/index.js";

const init = async () => {
  try {
    await mongoose.connect(config.DATABASES.mongo.URL, {
      dbName: config.DATABASES.mongo.dbName,
    });
    console.log("Connection with MongoDB succesfully established.");
  } catch (error) {
    console.log(error);
  }
};

export const MongoDBService = {
  init,
};
