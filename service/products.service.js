const faker = require('faker');
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
      });
    }
  }

  create(data) {
    const newProducts = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProducts);
    return newProducts;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((product) => product.id === id);
  }

  update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    const product = this.products[index];
    this.products[index] = { ...product, ...changes };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.products.splice(index, 1);
    return { success: true, message: 'product deleted successfully' };
  }
}

module.exports = ProductsService;
