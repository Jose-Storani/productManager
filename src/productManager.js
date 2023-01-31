import fs from "fs"

export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/products/products.json"
  }

  async getProducts() {
    if(fs.existsSync(this.path)){
      let dataProducts = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(dataProducts)
    }
    else{
      return []
    }
    
  }


  async addProduct(title, description,code, price,status =true,stock,category, thumbnail = []) {
    const productsFile = await this.getProducts()
    if (!(title, description,code, price,status,stock,category)) {
      // res.status(400).send("Debe ingresar todos los campos correspondientes");
      return "Debe ingresar todos los campos correspondientes"

    } else if (productsFile.length !== 0 && productsFile.some((product) => product.code === code)) {
      // res.status(400).send("EL CODIGO NO PUEDE SER IGUAL")
      return "EL CODIGO NO PUEDE SER IGUAL A UNO EXISTENTE"
    }


    else {
      let product = {
        title,
        description,
        code,
        price,
        status,
        thumbnail,
        category,
        stock,
        id: await this.#generarId(),
      };
      productsFile.push(product);
      fs.promises.writeFile(this.path, JSON.stringify(productsFile))
      // res.status(200).send("Producto agregado con exito")


      //Control de salida de datos
      // console.log(JSON.parse(fs.readFileSync(this.path, "utf-8" )))
    }
  }


  async #generarId() {
    let id = 1;
    const productsFile = await this.getProducts()
    if (productsFile.length !== 0) {
      id = productsFile[productsFile.length - 1].id + 1;
    }
    return id;
  }

  async getProductsById(id) {
    let dataProducts = await this.getProducts()
    let productById = dataProducts.find((product) => product.id === id) ?? "NOT FOUND";
    return productById;

  }

  //Principal problema: Modificar el elemento del array y despues escribir el archivo JSON sin modificar la totalidad del archivo. 
  //Para agregar: corrobar que fieldToUpdate sea un string, si no, el acceso a la propiedad no funcionaria

  //Esto solo funciona para modificar una propiedad a la vez, tiene que mejorar para tomar cualquier cantidad de valores o incluso el objeto entero.

  async updateProduct(id, fieldToUpdate, newValue) {
    let productsCopy = await this.getProducts();
    let productToUpdate = productsCopy[id - 1];
    productToUpdate[fieldToUpdate] = newValue;

    fs.promises.writeFile(this.path, JSON.stringify(productsCopy))

  }

  // optimizar, debe haber otra forma de hacerlo.
  async deleteProduct(id) {
    let productsCopy = await this.getProducts();
    let indexToDelete = id - 1
    productsCopy.splice(indexToDelete, 1);

    fs.promises.writeFile(this.path, JSON.stringify(productsCopy))





    // }
  }
}


//Instanciamos el producto y añadimos uno nuevo


// await sucursalCentro.addProduct("TV", "TV LG 32 pulgadas", 300, ["sin imagen"], "abc1234",
//   30
// )

// await sucursalCentro.addProduct("Smartphone ", "Samsung Galaxy S20 ", 500, ["sin imagen"], "abc123",
//   20
// )

// await sucursalCentro.addProduct("PC ", "INTEL i9 + NVIDIA 3060 ", 800, ["sin imagen"], "abc12345",
//   10)


//Prueba de encontrar por ID
// console.log(sucursalCentro.getProductsById(2))
















// {
//   "title": "Monitor Samsung", 
// "description": "22 pulgadas 75 mhz",
// "code": "12345mon22", 
//   "price": 500,
//   "status":true,
//   "stock":25,
// "category":"monitors", 
// "thumbnail":"imagen1monitor.png"
// }


// {
//   "title": "Monitor LG", 
// "description": "19 pulgadas 60 mhz",
// "code": "12345monLG19", 
//   "price": 300,
//   "stock":15,
// "category":"monitors", 
// "thumbnail":"imagen2monitor.png"
// }