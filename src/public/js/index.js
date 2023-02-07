const socketClient = io();

let formAddProduct = document.getElementById("formulario")
let titleForm = document.getElementById("title");
let priceForm = document.getElementById("price");
let productsList = document.getElementById("productsList")

formAddProduct.addEventListener("submit", ()=>{
    //si agrego el preventDefault para que aparezca en tiempo real los productos, no manda el post
    
    let title = titleForm.value;
    let price = priceForm.value;
    
    socketClient.emit("dataForm",{title,price})
})

socketClient.on("productsList", (productsListArray)=> {
    let listToRender = "";

    productsListArray.forEach(product => {
        listToRender += `Producto: ${product.title} </br>
        Precio: $${product.price} </br> `
        
    });

    productsList.innerHTML = listToRender


})