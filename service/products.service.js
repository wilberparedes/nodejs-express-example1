const faker = require('faker');
const boom = require('@hapi/boom'); //https://hapi.dev/module/boom/api/?v=9.1.4#http-4xx-errors

class ProductsService {
  constructor() {
    //para manejar todos los datos en memoria
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProducts = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProducts);
    return newProducts;
  }

  async find() {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw boom.notFound('product not found!!');

    if (product.isBlock) throw boom.conflict('product is block');
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('product not found!!');
    }
    this.products.splice(index, 1);
    return { success: true, message: 'product deleted successfully' };
  }
}

module.exports = ProductsService;
