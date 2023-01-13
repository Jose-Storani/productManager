class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }


  // Hola jose como estas ? muy bien el  trabajo todo funcionando correctamente y cumple con las consignas. Lo que podrias mejorar seria la verificacion de la info que te llega en  addProducts dentro el if pones  si name == null  no se agrega. Pero podrias ponerlo de esta forma 

// if(title, description, price, thumbnail, code, stock){}
// Ahi lo que interpretaria seria si name y thumbnail estan activos entra al if  y bueno ahi lo agregas . Es una recomendacion tu trabajo esta aprobado!

  addProduct(title, description, price, thumbnail, code, stock) {
    if(!(title , description , price , thumbnail , code , stock) ){
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











