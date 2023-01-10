class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.#generarId(),
    };
    this.products.push(product);
  }

  #generarId() {
    let id = 1;
    if (this.products.length !== 0) {
      id = this.products[this.products.length - 1].id + 1;
    }
    return id;
  }

  getProductsById(id) {
    return this.products.find((product) => product.id === id )
  }
}

let nuevoProducto = new ProductManager();
nuevoProducto.addProduct(
  "producto prueba",
  "este es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

console.log(nuevoProducto.getProductsById(1))


