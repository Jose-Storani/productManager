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
    console.log(pageNumber)
    showSpinner();
    const cartCreation = await fetch("/api/carts", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    const responseJson = await cartCreation.json();
    const cartId = responseJson.cartId._id;

    const response = await fetch(`/api/products?page=${pageNumber}`);
    const responseJSON = await response.json();
    const results = responseJSON.results;
    const products = results.payload;
    const totalPages = results.totalPages;


    //deshabilito los botones de siguiente y anterior dependiendo la cantidad de páginas de productos traída de la BD
    pageNumber === totalPages
        ? (nextButton.style.display = "none")
        : (nextButton.style.display = "flex");

    pageNumber === 1
        ? (prevButton.style.display = "none")
        : (prevButton.style.display = "flex");


        let stockArray = []
    //Render de cada card de producto
    let cardHTML = "";
    products.forEach((product) => {
        stockArray.push(product.stock)
        cardHTML += `
        <div class ="card" , style= "width:25rem">
<img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
<div class="card-body" style="text-align: center;">
<h5 class="card-title">${product.title}</h5>
<p class="card-text">${product.description}</p>
<p class="productStock" id=${product.stock}> Stock: ${product.stock} </p>
<label for="cantidad">Cantidad:</label>
<div class="contenedor">

<button id="substract">
    -
</button>
<p id="pQuantity">0</p>
<button id="add"> +</button>
</div>
<button class="btn btn-primary addToCart" id=${product._id}>Añadir al carrito</button>
</div>
</div>`;

    });

    productsList.innerHTML = cardHTML;
    pagination.style.display = "flex";

    const addButtonArray = document.querySelectorAll("#add");
    const substractButtonArray = document.querySelectorAll("#substract");
    const productQtyArray = document.querySelectorAll("#pQuantity");

    
    addButtonArray.forEach((button,index)=>{
        button.addEventListener("click",()=>{
            let productQty = parseInt(productQtyArray[index].innerHTML);
            if(parseInt(stockArray[index]) >= productQty){
                button.removeAttribute("disabled")
            }
            else{
                button.setAttribute("disabled","")
            }
            productQty++
            productQtyArray[index].innerHTML = productQty
        })

    })

    substractButtonArray.forEach((button,index)=>{
        button.addEventListener("click",()=>{
            let productQty = parseInt(productQtyArray[index].innerHTML);

            productQty--
            productQtyArray[index].innerHTML = productQty
        })

    })


    let addToCart = document.querySelectorAll(".addToCart");
    const productQuantityArray = document.querySelectorAll("#pQuantity");

    addToCart.forEach((button,index) => {
        const productId = button.id;

        button.addEventListener("click", async () => {
            const quantity = productQuantityArray[index].innerHTML;
            console.log(quantity)
            alert("Usted ingresó", quantity)

            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: parseInt(quantity) }),
            };

            await fetch(`/api/carts/${cartId}/products/${productId}`, options);
        });
    });

    cartLink.setAttribute("href", `/api/carts/${cartId}`);

    hideSpinner();
}

document.addEventListener("DOMContentLoaded", () => {
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




