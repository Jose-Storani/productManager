const productsList = document.getElementById("card-render");
const pagination = document.getElementById("pagination");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const cartLink = document.getElementById("linkToCart");
const spinner = document.querySelector(".center");

console.log(CART_ID);

let currentPage = 1;

function showSpinner() {
	spinner.style.display = "flex";
}

function hideSpinner() {
	spinner.style.display = "none";
}

//funcion renderizadora de productos:

document.addEventListener("DOMContentLoaded", () => {
	renderProductsList();
});

function handlePaginationClick(page) {
	productsList.innerHTML = "";
	renderProductsList(page);
}

nextButton.addEventListener("click", () => {
	currentPage++;
	handlePaginationClick(currentPage);
});

prevButton.addEventListener("click", () => {
	currentPage--;
	handlePaginationClick(currentPage);
});

async function renderProductsList(pageNumber = 1) {
	try {
		showSpinner();
		const response = await fetch(`/api/products?page=${pageNumber}`);
		const responseJSON = await response.json();
		const results = responseJSON.results;
		const products = results.payload;
		const totalPages = results.totalPages;

		pageNumber === totalPages
			? (nextButton.style.display = "none")
			: (nextButton.style.display = "flex");

		pageNumber === 1
			? (prevButton.style.display = "none")
			: (prevButton.style.display = "flex");

		let cardHTML = "";
		products.forEach((product) => {
			let hayStock = product.stock === 0;
			let cartButton = hayStock
				? ""
				: `<button class="btn btn-primary addToCart" id=${product._id}>Añadir al carrito</button>`;

			let modifyProductButton = `<button class="btn btn-primary modifyProduct" id=${product._id}>Modificar Producto</button>`;

			let deleteProductButton = `<button class="btn btn-primary deleteProduct" id=${product._id}>Eliminar Producto</button>`;

			let selectOptions = hayStock
				? `<option value="NO STOCK">SIN STOCK</option>`
				: `<option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>`;

			// Se establece el contenido de la card
			//dependiendo si es admin o no, se renderizaran opciones correspondientes
			cardHTML += `
        <div class ="card" , style= "width:25rem">
<img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
<div class="card-body" style="text-align: center;">
<h5 class="card-title">${product.title}</h5>
<p class="card-text">${product.description}</p>
${
	!IS_ADMIN
		? `
<div class="options" style="display:flex justify-content:center">
<label for="cantidad">Cantidad:</label>
<select id="productQuantity" name="cantidad">
  ${selectOptions}
</select>
</div>
${cartButton}`
		: `<div> ${modifyProductButton} ${deleteProductButton} </div>`
}
</div>
</div>`;
		});

		productsList.innerHTML = cardHTML;
		pagination.style.display = "flex";

		const deleteProductButtons = document.querySelectorAll(".deleteProduct");
		deleteProductFunction(deleteProductButtons);

		const modifyProductButtons = document.querySelectorAll(".modifyProduct");

		modifyProductFunction(modifyProductButtons);

		let addToCartButtons = document.querySelectorAll(".addToCart");
		const productQuantityArray = document.querySelectorAll("#productQuantity");

		addToCartFunction(addToCartButtons, productQuantityArray);

		cartLink?.setAttribute("href", `/api/carts/${CART_ID}`);

		hideSpinner();
	} catch (error) {
		alert("Error al obtener los productos");
	}
}

const addToCartFunction = (Addbuttons, QuantityArray) => {
	Addbuttons.forEach((button, index) => {
		const selectElement = QuantityArray[index];
		let selectedQuantity = selectElement.value;

		selectElement.addEventListener("change", () => {
			selectedQuantity = selectElement.value;
		});

		button.addEventListener("click", async () => {
			try {
				const quantity = selectedQuantity;
				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ quantity: parseInt(quantity) }),
				};

				await fetch(`/api/carts/${CART_ID}/product/${button.id}`, options);
				alert("Cantidad seleccionada añadida al carrito");
			} catch (error) {
				console.log(error);
				alert("Error al agregar al carrito");
			}
		});
	});
};

const modifyProductFunction = (ArrayOfbuttons) => {
	ArrayOfbuttons.forEach((button) => {
		button.addEventListener("click", (e) => {
			let productCard = e.target.closest(".card");

			let modifyForm = document.createElement("form");
			modifyForm.setAttribute("class", "modify-product-form");

			let inputTitle = document.createElement("input");
			inputTitle.setAttribute("type", "text");
			inputTitle.setAttribute("placeholder", "Title");

			let inputDescription = document.createElement("input");
			inputDescription.setAttribute("type", "text");
			inputDescription.setAttribute("placeholder", "Description");

			let inputStock = document.createElement("input");
			inputStock.setAttribute("type", "number");
			inputStock.setAttribute("placeholder", "Stock");
			inputStock.setAttribute("min", "1");

			let inputCategory = document.createElement("input");
			inputCategory.setAttribute("type", "text");
			inputCategory.setAttribute("placeholder", "Category");

			let inputThumbnail = document.createElement("input");
			inputThumbnail.setAttribute("type", "url");
			inputThumbnail.setAttribute("placeholder", "Thumbnail");

			let inputPrice = document.createElement("input");
			inputPrice.setAttribute("type", "number");
			inputPrice.setAttribute("placeholder", "Price");
			inputPrice.setAttribute("min", "1");

			let inputSubmit = document.createElement("input");
			inputSubmit.setAttribute("type", "submit");
			inputSubmit.setAttribute("value", "Enviar");
			inputSubmit.setAttribute("class", "btn btn-primary");

			modifyForm.append(
				inputTitle,
				inputDescription,
				inputPrice,
				inputStock,
				inputCategory,
				inputThumbnail,
				inputSubmit
			);

			productCard.innerHTML = "";
			productCard.appendChild(modifyForm);

			modifyForm.addEventListener("submit", async (e) => {
				try {
					e.preventDefault();
					const formData = {
						title: inputTitle.value,
						description: inputDescription.value,
						price: inputPrice.value,
						stock: inputStock.value,
						category: inputCategory.value,
						thumbnail: inputThumbnail.value,
					};

					for (let key in formData) {
						if (formData.hasOwnProperty(key)) {
							formData[key] = formData[key].trim();
							const value = formData[key];
							if (!value) delete formData[key];
						}
					}

					const options = {
						method: "PUT",
						headers: {
							"Content-type": "application/json; charset=UTF-8",
						},
						body: JSON.stringify(formData),
					};

					let responseJSON = await fetch(`/api/products/${button.id}`, options);
					const response = await responseJSON.json();
					alert("enviado");

					window.location.reload();
				} catch (error) {
					alert("Error al enviar formulario");
				}
			});
		});
	});
};

const deleteProductFunction = (arrayButtons) => {
	arrayButtons.forEach((button) => {
		button.addEventListener("click", async () => {
			try {
				const response = await fetch(`/api/products/${button.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const responseData = await response.json();
				alert(responseData.mensaje);
				window.location.reload();
			} catch (error) {
				alert("Error al eliminar el producto");
			}
		});
	});
};
