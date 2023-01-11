class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if(title == null, description == null, price == null, thumbnail == null, code == null, stock == null){
      alert("Debe ingresar todos los campos correspondientes")   
    }
    else{
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

let sucursalCentro = new ProductManager();
sucursalCentro.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123",20
  )
console.log(sucursalCentro.getProducts())








