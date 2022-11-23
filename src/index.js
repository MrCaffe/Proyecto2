import express from "express";
import { config } from "./config/index.js";
import { CartRouter, ProductRouter } from "./routers/index.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

const server = app.listen(config.SERVER.PORT, () =>
  console.log(`Server listening on port: ${server.address().port}`)
);
