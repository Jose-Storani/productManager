class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if(title == null, description == null, price == null, thumbnail == null, code == null, stock == null){
      alert("Debe ingresar todos los campos correspondientes");
      
    } else if(this.products.length !== 0 && this.products.some((product) => product.code === code)) {
      alert("EL CODIGO NO PUEDE SER IGUAL")
      

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
    let productById = this.products.find((product) => product.id === id) ?? "NOT FOUND";
    return productById;
   
  }
}

//Instanciamos el producto y añadimos uno nuevo
let sucursalCentro = new ProductManager();
sucursalCentro.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123",
20
  )

//Prueba 2: añadimos otro producto, si no se ingresa un campo, sale un alert, y si el CODE esta repetido, sale otro Alert.
sucursalCentro.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123456",
20)

//Prueba 3: obtener producto por su ID.
console.log(sucursalCentro.getProductsById(2))










