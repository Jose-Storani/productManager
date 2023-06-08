// const socketClient = io();

let formAddProduct = document.querySelector(".formProducts");
console.log(formAddProduct)
let productsList = document.getElementById("productsList");

//* todos los inputs del form
const formElements = [...document.getElementsByClassName("form")];

//al conectarse al endpoint, display de los productos en la BD
// socketClient.on("productsList", (productsListArray) => {
//     let listToRender = "";
//     productsListArray.forEach(product => {
//         listToRender += `Producto: ${product.title} </br>
//         Precio: $${product.price} </br></br> `
//     });
//     productsList.innerHTML = listToRender
// });


formAddProduct.addEventListener("submit", (e) => {
    e.preventDefault();

    //objeto a enviar por body del request
    let producto = {
        title: formAddProduct[0].value,
        description: formAddProduct[1].value,
        code: formAddProduct[2].value,
        price: formAddProduct[3].value,
        stock: formAddProduct[4].value,
        category: formAddProduct[5].value,
        thumbnail: formAddProduct[6].value
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
                console.log(response.json())
            else
                throw new Error(response.status);
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
        });
			})
    //manejo de data del servidor hacia el cliente y viceversa
//     socketClient.emit("dataForm", { title: producto.title, price: producto.price })
//     socketClient.on("productsList", (productsListArray) => {
//         let listToRender = "";

//         productsListArray.forEach(product => {
//             listToRender += `Producto: ${product.title} </br>
//             Precio: $${product.price} </br></br> `
//         });
//         productsList.innerHTML = listToRender
//     })

//     formElements.forEach((e)=>{
//         e.value = "";
//     })

// })





//formulario DELETE

// let formDelete = document.getElementById("deleteForm");
// let idDeleteElement = document.getElementById("idProduct");


// formDelete.addEventListener("submit", (e) => {
//     e.preventDefault();

//     let idProductToDelete = idDeleteElement.value;
//     let url = "/api/products/" + idProductToDelete


//     const options = {
//         method: "DELETE",
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     }

//     fetch(url, options)
//         .then(response => {
//             if (response.ok)
//                 console.log(response)
//             else
//                 throw new Error(response.status);
//         })
//         .then(() => {
//             socketClient.emit("dataDeleted", { id: idProductToDelete });
//         })
//         .catch(err => {
//             console.error("ERROR: ", err.message)
//         });


//     //POR ALGUNA RAZON, EL ENVIO EN TIEMPO REAL DE LA LISTA CON PRODUCTO ELIMINADO SOLO ES A UN SOCKET Y NO A TODOS LOS NAVEGADORES ABIERTOS.

//     socketClient.on("productsListDeleted", (productsListArray) => {
//         let listToRender = "";

//         productsListArray.forEach(product => {
//             listToRender += `Producto: ${product.title} </br>
//                 Precio: $${product.price} </br>
//                 </br> `
//         });

//         productsList.innerHTML = listToRender
//     })

// })







