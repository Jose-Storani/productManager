
document.addEventListener("DOMContentLoaded", async () => {

    //creo carrito al cargar la pagina
    const cartCreated = await fetch("/api/carts", { method: "POST" });
                    const cartData = await cartCreated.json();
                    const cartId = cartData._id
                    // console.log(cartId)

 //cuando carga el documento, renderizo la tabla con los productos traidos de la BD usando metodo get con fetch      
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            
        },
    };
    fetch("/api/products", options)
        .then((res) => res.json())
        .then((response) => {
            // console.log(response.results.payload);
            const products = response.results.payload;
            const table = document.querySelector("#productsTable");
            const productsTableBody = table.querySelector("tbody");

            //por cada producto, creamos un item de la tabla junto con el boton agregar para el carrito
            products.forEach((product) => {
                const row = document.createElement("tr");
                const titleCell = document.createElement("td");
                const descriptionCell = document.createElement("td");
                const codeCell = document.createElement("td");
                const statusCell = document.createElement("td");
                const stockCell = document.createElement("td");
                const categoryCell = document.createElement("td");
                const priceCell = document.createElement("td");
                const thumbnailCell = document.createElement("td");
                const addToCartButton = document.createElement("td");

                //valores de cada celda
                titleCell.textContent = product.title;
                descriptionCell.textContent = product.description;
                codeCell.textContent = product.code;
                statusCell.textContent = products.status;
                stockCell.textContent = product.stock;
                categoryCell.textContent = product.category;
                priceCell.textContent = product.price;
                thumbnailCell.textContent = product.thumbnail;
                addToCartButton.innerHTML = `<button class="addToCart" id=${product._id}>Agregar</button>`;

                //append para agregar cada row
                row.appendChild(titleCell);
                row.appendChild(descriptionCell);
                row.appendChild(codeCell);
                row.appendChild(statusCell);
                row.appendChild(stockCell);
                row.appendChild(categoryCell);
                row.appendChild(priceCell);
                row.appendChild(thumbnailCell);
                row.appendChild(addToCartButton);

                //agregar cada row al body de la tabla
                productsTableBody.appendChild(row);
            });

            //traigo los botones creados, para despues agregarle una funcion
            let addToCart = document.querySelectorAll(".addToCart");
           

            addToCart.forEach((button) => {
                const productId = button.id
                button.addEventListener("click", async () => {                    
                    //agregar producto al carrito con fetch
                    const productAdded = await fetch(`/api/carts/${cartId}/product/${productId}`,{method:"POST"});
                    alert("Producto añadido al carrito")

                    
                });
            });
        })
        .catch((error) => console.log(error));


        
let cartLink = document.getElementById("linkToCart");
cartLink.setAttribute("href",`/api/carts/${cartId}`);
});

let logOutButton = document.getElementById("logOut");
logOutButton.addEventListener("click", async(e)=>{
    e.preventDefault();
    const logOut = await fetch("/api/sessions/logout");
    const logOutJson = await logOut.json();
    console.log(logOutJson);

    window.location.href = "/"
    

})
