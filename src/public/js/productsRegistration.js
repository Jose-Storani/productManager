

let formAddProduct = document.querySelector(".formProducts");

//* todos los inputs del form
const formElements = [...document.getElementsByTagName("input")];

console.log(formElements)


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
            if (response.ok){
							console.log(response.json());
							[...formAddProduct].forEach((input)=>{
								if(input.type === "submit") return
								
								input.value = "";
							})

						}
								
            else
                throw new Error(response.status);
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
        });


			})





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









