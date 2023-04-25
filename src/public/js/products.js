
document.addEventListener("DOMContentLoaded", async () => {
    //creo carrito al cargar la pagina solo SI el usuario no tiene uno ya asignado a su propiedad associatedCart
    const cartCreation = await fetch("/api/carts", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }
    );
    const responseJson = await cartCreation.json();
    const cartId = responseJson.cartId;
    
    //cuando carga el documento, renderizo la tabla con los productos traidos de la BD usando metodo get con fetch      
    fetch("/api/products")
        .then((res) => res.json())
        .then((response) => {
            const products = response.results.payload;

            //por cada producto, creamos un item de la tabla junto con el boton agregar para el carrito
            products.forEach((product) => {
                let cardDiv = document.createElement("div");
                cardDiv.setAttribute("class", "card");
                cardDiv.setAttribute("style", "width: 25rem;");

                // Se establece el contenido de la card
                cardDiv.innerHTML = `
  <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
  <div class="card-body" style="text-align: center;">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.description}</p>
    <a href="#" class="btn btn-primary addToCart" id=${product._id}>Añadir al carrito</a>
  </div>
`;


                // Agrego al div existente todo lo creado
                let myDiv = document.getElementById("card-render");
                myDiv.appendChild(cardDiv);
            })

            //REMOVE SPINNER
            let spinner = document.querySelector(".custom-loader");
            spinner.setAttribute("hidden", "hidden")


            //traigo los botones creados, para despues agregarle una funcion
            let addToCart = document.querySelectorAll(".addToCart");
            
            addToCart.forEach((button) => {
                const productId = button.id
                button.addEventListener("click", async (e) => {
                    e.preventDefault()
                    //agregar producto al carrito con fetch
                    await fetch(`/api/carts/${cartId}/product/${productId}`, { method: "POST" });
                    alert("Producto añadido al carrito")


                });
            });
        }).catch((error) => console.log(error));

        let cartLink = document.getElementById("linkToCart");
        cartLink.setAttribute("href", `/api/carts/${cartId}`);
})














