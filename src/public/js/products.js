const productsList = document.getElementById("card-render");
const pagination = document.getElementById("pagination");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const spinner = document.querySelector(".center");

function showSpinner(){
    spinner.style.display = "flex";
}

function hideSpinner(){
    spinner.style.display= "none"
}



//funcion renderizadora de productos:



async function renderProductsList(pageNumber = 1){
    
    showSpinner();
    const response = await fetch(`/api/products?page=${pageNumber}`);
    const responseJSON= await response.json();
    const results = responseJSON.results
    const products = results.payload
    const totalPages = results.totalPages;

    let cardHTML = "";
    products.forEach((product) => {
        
        // Se establece el contenido de la card
        cardHTML += `
        <div class ="card" , style= "width:25rem">
<img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
<div class="card-body" style="text-align: center;">
<h5 class="card-title">${product.title}</h5>
<p class="card-text">${product.description}</p>
<a href="#" class="btn btn-primary addToCart" id=${product._id}>Añadir al carrito</a>
</div>
</div>`;
    });

    hideSpinner()
    productsList.innerHTML = cardHTML

    pagination.style.display = "flex"

    hideSpinner()
   
}

let currentPage = 1

document.addEventListener("DOMContentLoaded",async()=>{
    renderProductsList();
    


})

nextButton.addEventListener("click",()=>{
    productsList.innerHTML = ""
    currentPage++
    renderProductsList(currentPage)
})

prevButton.addEventListener("click",()=>{
    productsList.innerHTML = ""
    currentPage--
    renderProductsList(currentPage)
})

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














