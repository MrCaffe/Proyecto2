import mongoose from "mongoose";

class ContainerMongo {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async save(element) {
    try {
      const response = await this.model.create(element);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const elements = await this.model.find();
      return elements;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getById(id) {
    try {
      const element = await this.model.findById(id);
      return element;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    try {
      const response = await this.model.findByIdAndUpdate(id, newData, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const response = await this.model.deleteMany();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export { ContainerMongo };
