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
		
    const cartCreation = await fetch("/api/carts", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }
    );
    const responseJson = await cartCreation.json();
    const cartId = responseJson.cartId._id;
		console.log("id del carrito", cartId)
    
    const response = await fetch(`/api/products?page=${pageNumber}`);
    const responseJSON = await response.json();
    const results = responseJSON.results;
    const products = results.payload;
    const totalPages = results.totalPages;

    pageNumber === totalPages ?
        nextButton.style.display = "none" :
        nextButton.style.display = "flex";

    pageNumber == 1
        ? (prevButton.style.display = "none")
        : (prevButton.style.display = "flex");

    let cardHTML = "";
    products.forEach((product) => {
        let hayStock = product.stock === 0;
        let cartButton = hayStock ? "": `<button class="btn btn-primary addToCart" id=${product._id}>Añadir al carrito</button>` 
        let selectOptions = hayStock ?  `<option value="NO STOCK">SIN STOCK</option>` : `<option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>`
        // Se establece el contenido de la card
        cardHTML += `
        <div class ="card" , style= "width:25rem">
<img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
<div class="card-body" style="text-align: center;">
<h5 class="card-title">${product.title}</h5>
<p class="card-text">${product.description}</p>
<div class="options" style="display:flex justify-content:center">
<label for="cantidad">Cantidad:</label>
<select id="productQuantity" name="cantidad">
  ${selectOptions}
</select>
</div>
${cartButton}
</div>
</div>`;
    });

    productsList.innerHTML = cardHTML;
    pagination.style.display = "flex";
    

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
