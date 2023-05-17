const productsList = document.getElementById("card-render");
const pagination = document.getElementById("pagination");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const cartLink = document.getElementById("linkToCart");
const spinner = document.querySelector(".center");

let currentPage = 1;

function showSpinner() {
    spinner.style.display = "flex";
}

function hideSpinner() {
    spinner.style.display = "none";
}

//funcion renderizadora de productos:

async function renderProductsList(pageNumber = 1) {
    showSpinner();
    const response = await fetch(`/api/products?page=${pageNumber}`);
    const responseJSON = await response.json();
    const results = responseJSON.results;
    const products = results.payload;
    const totalPages = results.totalPages;

    pageNumber === totalPages ?
        nextButton.style.display = "none" :
        nextButton.style.display = "flex";

    pageNumber < 1
        ? (prevButton.style.display = "none")
        : (prevButton.style.display = "flex");

    let cardHTML = "";
    products.forEach((product) => {
        // Se establece el contenido de la card
        cardHTML += `
        <div class ="card" , style= "width:25rem">
<img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
<div class="card-body" style="text-align: center;">
<h5 class="card-title">${product.title}</h5>
<p class="card-text">${product.description}</p>
<label for="cantidad">Cantidad:</label>
<select id="productQuantity" name="cantidad">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
</select>
<button class="btn btn-primary addToCart" id=${product._id}>Añadir al carrito</button>
</div>
</div>`;
    });

    productsList.innerHTML = cardHTML;
    pagination.style.display = "flex";
    const cartCreation = await fetch("/api/carts", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }
    );
    const responseJson = await cartCreation.json();
    const cartId = responseJson.cartId;

    let addToCart = document.querySelectorAll(".addToCart")
    const productQuantityArray = document.querySelectorAll("#productQuantity")




    addToCart.forEach((button, index) => {
        const productId = button.id
        const selectElement = productQuantityArray[index];
        let selectedQuantity = selectElement.value;

        selectElement.addEventListener("change", () => {
            selectedQuantity = selectElement.value
        })

        button.addEventListener("click", async () => {
            const quantity = selectedQuantity
            console.log(quantity)

            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: parseInt(quantity) })
            }

            await fetch(`/api/carts/${cartId}/products/${productId}`, options)
        })

    })


    cartLink.setAttribute("href", `/api/carts/${cartId}`);




    hideSpinner();
}

document.addEventListener("DOMContentLoaded", async () => {
    renderProductsList();
});

nextButton.addEventListener("click", () => {
    productsList.innerHTML = "";
    currentPage++;
    renderProductsList(currentPage);
});

prevButton.addEventListener("click", () => {
    productsList.innerHTML = "";
    currentPage--;
    renderProductsList(currentPage);
});

// document.addEventListener("DOMContentLoaded", async () => {
//     //creo carrito al cargar la pagina solo SI el usuario no tiene uno ya asignado a su propiedad associatedCart
//     const cartCreation = await fetch("/api/carts", {
//         method: "POST",
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     }
//     );
//     const responseJson = await cartCreation.json();
//     const cartId = responseJson.cartId;

//     //cuando carga el documento, renderizo la tabla con los productos traidos de la BD usando metodo get con fetch
//     fetch("/api/products")
//         .then((res) => res.json())
//         .then((response) => {
//             const results = response.results
//             const products = results.payload;

//             //por cada producto, creamos un item de la tabla junto con el boton agregar para el carrito
//             products.forEach((product) => {
//                 // let cardDiv = document.createElement("div");
//                 // cardDiv.setAttribute("class", "card");
//                 // cardDiv.setAttribute("style", "width: 25rem;");
//                 let cardDiv = document.getElementById("cardDiv")

//                 // Se establece el contenido de la card
//                 let cardHTML= `
//     <div class ="card" , style= "width:25rem">
//   <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
//   <div class="card-body" style="text-align: center;">
//     <h5 class="card-title">${product.title}</h5>
//     <p class="card-text">${product.description}</p>
//     <a href="#" class="btn btn-primary addToCart" id=${product._id}>Añadir al carrito</a>
//   </div>
//   </div>
// `;

//                 // Agrego al div existente todo lo creado
//                 let myDiv = document.getElementById("card-render");
//                 myDiv.innerHTML = cardHTML;
//             })

//             //REMOVE SPINNER
//             let spinner = document.querySelector(".custom-loader");
//             spinner.setAttribute("hidden", "hidden")

//             //navegacion entre las páginas de productos
//             let nextButton = document.getElementById("next-btn");
//             console.log(nextButton)

//             nextButton.addEventListener("click",async()=>{
//                 renderProductsList(2);

//             })

//             //traigo los botones creados, para despues agregarle una funcion
//             let addToCart = document.querySelectorAll(".addToCart");

//             addToCart.forEach((button) => {
//                 const productId = button.id
//                 button.addEventListener("click", async (e) => {
//                     e.preventDefault()
//                     //agregar producto al carrito con fetch
//                     await fetch(`/api/carts/${cartId}/product/${productId}`, { method: "POST" });
//                     alert("Producto añadido al carrito")

//                 });
//             });
//         }).catch((error) => console.log(error));

// let cartLink = document.getElementById("linkToCart");
// cartLink.setAttribute("href", `/api/carts/${cartId}`);
// })
