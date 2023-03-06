document.addEventListener("DOMContentLoaded",()=>{
    const options = {
        method: "GET",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        
    };
        fetch("/api/products", options)
        .then(res => res.json())
        .then(response => {
            console.log(response.results.payload)
            const products = response.results.payload
            const table = document.querySelector('#productsTable');
            const productsTableBody = table.querySelector('tbody');
            products.forEach(product => {
                const row = document.createElement('tr');
                const titleCell = document.createElement('td');
                const descriptionCell = document.createElement('td');
                const codeCell = document.createElement('td');
                const statusCell = document.createElement("td");
                const stockCell = document.createElement("td");
                const categoryCell = document.createElement("td");
                const priceCell = document.createElement("td");
                const thumbnailCell = document.createElement("td");
                const addToCartButton = document.createElement("td")
            
                titleCell.textContent = product.title;
                descriptionCell.textContent = product.description;
                codeCell.textContent = product.code;
                statusCell.textContent = products.status;
                stockCell.textContent = product.stock;
                categoryCell.textContent = product.category;
                priceCell.textContent = product.price
                thumbnailCell.textContent = product.thumbnail
                addToCartButton.innerHTML = "<button>Agregar</button>"
                row.appendChild(titleCell);
                row.appendChild(descriptionCell);
                row.appendChild(codeCell);
                row.appendChild(statusCell);
                row.appendChild(stockCell);
                row.appendChild(categoryCell)
                row.appendChild(priceCell);
                row.appendChild(thumbnailCell)
                row.appendChild(addToCartButton)
                productsTableBody.appendChild(row);
              });
          })
        .catch(error => console.log(error))
    

})
