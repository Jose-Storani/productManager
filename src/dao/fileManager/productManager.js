import fs from "fs"
import { __dirname } from "../../utilities.js";

export class ProductManager {
    constructor() {
        this.pathProduct = __dirname + "/files/products.json";
        this.pathCart = __dirname + "/products/carrito.json";
    }


    //*PRODUCTOS

    async getProducts() {
        if (fs.existsSync(this.pathProduct)) {
            let productsFile = await fs.promises.readFile(this.pathProduct, "utf-8");
            return JSON.parse(productsFile)
        }
        else {
            return []
        }

    }


    async addProduct(title, description, code, price, status = true, stock, category, thumbnail = []) {
        const productsFile = await this.getProducts()
        if (!(title, description, code, price, stock, category)) {
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
            await fs.promises.writeFile(this.pathProduct, JSON.stringify(productsFile))


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
        let productsFile = await this.getProducts()
        let productById = productsFile.find((product) => product.id === id) ?? 400;
        return productById;

    }



    async updateProduct(id, fieldToUpdate) {
        let productsFile = await this.getProducts();
        let productToUpdate = productsFile.find((product) => product.id === id);


        let { title, description, code, price, stock, category, thumbnail, status } = fieldToUpdate


        // aca hay que comprobar si el codigo nuevo ingresado no coincide con uno anteriormente registrado
        if (code && productsFile.some((product) => product.code === code)) {
            return 400
        }
        else if (code) {
            productToUpdate.code = code
        }

        //compruebo si existen algunos de los valores pasados para hacer update o no

        if (title) {
            productToUpdate.title = title
        }


        if (description) {
            productToUpdate.description = description
        }

        if (price) {
            productToUpdate.price = price
        }
        if (stock) {
            productToUpdate.stock = stock
        }

        if (category) {
            productToUpdate.category = category
        }

        if (thumbnail) {
            productToUpdate.thumbnail = thumbnail
        }

        if (status) {
            productToUpdate.status = status
        }


        await fs.promises.writeFile(this.pathProduct, JSON.stringify(productsFile))



    }

    async eliminarProducto(id) {
        const productsFile = await this.getProducts();
        const nuevoArray = productsFile.filter(product => product.id !== id);
        await fs.promises.writeFile(this.pathProduct, JSON.stringify(nuevoArray));

    }

    async eliminarProductos() {
        if (fs.existsSync(this.pathProduct)) {
            await fs.promises.unlink(this.pathProduct)

        }
    }

    //manejo con el servidor

    async listToShow(id) {
        let products = await this.getProducts();
        if (products.length === 0) {
            return products
        }

        else if (id) {
            // let products = await this.getProducts();
            let productsListFiltered = products.filter(u => u.id !== id);
            let productsList = productsListFiltered.map((product) => {
                let productSimplificado = {
                    title: product.title,
                    price: product.price
                }
                return productSimplificado
            })
            return productsList
        }
        else {
            let productsList = [];
            productsList = products.map((product) => {
                let productSimplificado = {
                    title: product.title,
                    price: product.price
                }
                return productSimplificado
            }
            )

            return productsList
        }

    }
}