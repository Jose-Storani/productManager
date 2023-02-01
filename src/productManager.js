import fs from "fs"

export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/products/products.json";
    this.pathCart = "./src/products/carrito.json";
  }


  //*PRODUCTOS

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
      return 401

    } else if (productsFile.length !== 0 && productsFile.some((product) => product.code === code)) {
      // res.status(400).send("EL CODIGO NO PUEDE SER IGUAL")
      return 402
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
     await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
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
    let productById = dataProducts.find((product) => product.id === id) ?? 400;
    return productById;

  }

  

  async updateProduct(id, fieldToUpdate) {
    let productsCopy = await this.getProducts();
    let productToUpdate = productsCopy.find((product) => product.id === id);
    
     let {title, description,code, price,stock,category,thumbnail,status} = fieldToUpdate
     

    // aca hay que comprobar si el codigo nuevo ingresado no coincide con uno anteriormente registrado
    if(code && productsCopy.some((product) => product.code === code)){
        return 400
    }
      else if(code){
        productToUpdate.code = code 
      }

    if(title){
      productToUpdate.title = title
    }

  
    if(description){
      productToUpdate.description = description
    }
    
    if(price){
      productToUpdate.price = price
    }
    if(stock){
      productToUpdate.stock = stock
    }

    if(category){
      productToUpdate.category = category
    }
    
    if(thumbnail){
      productToUpdate.thumbnail = thumbnail
    }

    if(status){
      productToUpdate.status = status
    }
  

    await fs.promises.writeFile(this.path, JSON.stringify(productsCopy))

    

  }

  async eliminarProducto(id){
    const productsFile = await this.getProducts();
    const nuevoArray = productsFile.filter(u => u.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(nuevoArray));
  
   }
  
   async eliminarProductos() {
    if(fs.existsSync(this.path)){
      await fs.promises.unlink(this.path)
  
    }
   }




   //*CARRITO
   
   async getCart() {
    if(fs.existsSync(this.pathCart)){
      let dataCart = await fs.promises.readFile(this.pathCart, "utf-8");
    return JSON.parse(dataCart)
    }
    else{
      return []
    }
    
  }
  
  async #generarIdCart() {
    let id = 1;
    const cartFile = await this.getCart()
    if (cartFile.length !== 0) {
      id = cartFile[cartFile.length - 1].id + 1;
    }
    return id;
  }

  async addToCart() {
    const cartFile = await this.getCart();
    let newCart = {
      id:await this.#generarIdCart(),
      products: []
    }

    cartFile.push(newCart);
    await fs.promises.writeFile(this.pathCart, JSON.stringify(cartFile))
    return newCart

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