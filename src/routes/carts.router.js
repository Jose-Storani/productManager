import { Router } from "express";
import { cartManager } from "../app.js";

const router = Router();

//!RUTA: API/CARTS

//todos los carritos
router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts();
    res.json(carts)
})

//carrito por ID pasado por params

router.get("/:cId", async (req, res) => {
    try {
        const { cId } = req.params;
        const cart = await cartManager.getCartbyId(cId);
        if (cart) {
            res.json(cart)
        }
        else {
            res.json({ mensage: "Carrito no encontrado" })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/", async (req, res) => {
    res.status(200).json(await cartManager.createACart());

})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const respuesta = await cartManager.addToCart(cid, pid);
        if (!respuesta) {
            res.json({ mensage: "Carrito no encontrado" })
        }
        else {
            res.json(respuesta)
        }
    } catch (error) {
        console.log(error)
    }





})

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const productsUpdated = await cartManager.updateCartProductsByArray(cid, products);
        if (updateCartProductsByArray) {
            res.json(productsUpdated)
        }
        else {
            res.json({ mensaje: "carrito no encontrado para actualizar" })
        }

    } catch (error) {
        console.log(error)
    }

})

router.put("/:cid/products/:pid", async (req, res) => {
    const { quantity } = req.body;
    const { cid, pid } = req.params;
    const updatedProduct = await cartManager.updateQuantityByQuery(cid, pid, quantity);
    res.json(updatedProduct)
});

router.delete("/", async (req, res) => {
    try {
        const response = await cartManager.deleteAllCarts();
        res.json({ mensaje: "Carritos eliminados con exito", cantidad: response })
    } catch (error) {
        console.log(error)
    }
})

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;

        const deletedCart = await cartManager.deleteCartById(cid);
        res.status(200).json({ "carrito eliminado con exito: ": deletedCart })

    } catch (error) {
        console.log(error)
    }

})

router.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params

    const productDeletedFromCart = await cartManager.deleteProductCart(cid, pid);
    if (productDeletedFromCart) {
        res.json({ "producto eliminado con exito": productDeletedFromCart })
    }
    else {
        res.json({ "error": "producto no encontrado" })
    }
})

export default router