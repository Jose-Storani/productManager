const socketClient = io();

let formAddProduct = document.getElementById("formulario")
let titleForm = document.getElementById("title");
let priceForm = document.getElementById("price");
let productsList = document.getElementById("productsList");

//* todos los inputs del form
const formElements = [...document.getElementsByClassName("form")];


formAddProduct.addEventListener("submit", (e) => {
    e.preventDefault();

    //objeto a enviar por body del request
    let producto = {
        title: formElements[0].value,
        description: formElements[1].value,
        code: formElements[2].value,
        price: formElements[3].value,
        status: formElements[4].value,
        category: formElements[5].value,
        thumbnail: formElements[6].value
    }

    
    // variable con info para el request
    const options = {
        method: "POST",        
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        body: JSON.stringify(producto)
    };



    // envio al endpoint
    fetch("/api/products", options)
        .then(response => {
            if (response.ok)
                console.log(response)
            else
                throw new Error(response.status);
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
        });



        //manejo de data del servidor hacia el cliente y viceversa
    socketClient.emit("dataForm", { title : producto.title , price: producto.price })
    socketClient.on("productsList", (productsListArray) => {
        let listToRender = "";

        productsListArray.forEach(product => {
            listToRender += `Producto: ${product.title} </br>
            Precio: $${product.price} </br> `
        });

        productsList.innerHTML = listToRender
    })

})






