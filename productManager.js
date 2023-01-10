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
nuevoProducto.addProduct(
  "producto 2",
  "este es un producto 2",
  50,
  "sin imagen",
  "abc1254",
  25
);
console.log(nuevoProducto.products);
