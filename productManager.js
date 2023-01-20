const fs = require("fs")

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./products.json"
  }

  getProducts() {
    let dataProducts = fs.readFileSync(this.path,"utf-8");
    return JSON.parse(dataProducts)
  }


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
    fs.writeFileSync(this.path, JSON.stringify(this.products))
    

    //Control de salida de datos
    // console.log(JSON.parse(fs.readFileSync(this.path, "utf-8" )))
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
    let dataProducts = fs.readFileSync(this.path,"utf-8");
    dataProducts = JSON.parse(dataProducts)
    let productById = dataProducts.find((product) => product.id === id) ?? "NOT FOUND";
    return productById;
   
  }

  //Principal problema: Modificar el elemento del array y despues escribir el archivo JSON sin modificar la totalidad del archivo. 
  //Para agregar: corrobar que fieldToUpdate sea un string, si no, el acceso a la propiedad no funcionaria

  //Esto solo funciona para modificar una propiedad a la vez, tiene que mejorar para tomar cualquier cantidad de valores o incluso el objeto entero.

  updateProduct(id, fieldToUpdate,newValue){
    let productsCopy = this.getProducts();
    let productToUpdate = productsCopy[id - 1];
    productToUpdate[fieldToUpdate] = newValue;

    fs.writeFileSync(this.path, JSON.stringify(productsCopy))
     
  }

  //optimizar, debe haber otra forma de hacerlo.
  deleteProduct (id){
    let productsCopy = this.getProducts();
    let indexToDelete = id - 1
    productsCopy.splice(indexToDelete, 1);

    
    

     fs.writeFileSync(this.path, JSON.stringify(productsCopy))



    


  }
}

  

//Instanciamos el producto y añadimos uno nuevo
let sucursalCentro = new ProductManager();
sucursalCentro.addProduct("producto prueba 2", "este es un producto prueba 2", 300, "sin imagen", "abc1234",
30
  )

  sucursalCentro.addProduct("producto prueba ", "este es un producto prueba ", 200, "sin imagen", "abc123",
30
  )


//Prueba de encontrar por ID
// console.log(sucursalCentro.getProductsById(2))

sucursalCentro.deleteProduct(2)















