const deleteProductButton = document.querySelectorAll(".deleteProductButton");

deleteProductButton.forEach((button) => {
	const PRODUCT_ID = button.id;
	button.addEventListener("click", async () => {
		await fetch(`/api/carts/${cartId}/product/${PRODUCT_ID}`, {
			method: "DELETE",
		});
		location.reload();
	});
});
document.addEventListener("DOMContentLoaded", () => {
	const total = document.getElementById("totalValue");
	if (total) {
		total.textContent = totalValue.toFixed(2);
	}
});

const value = totalValue.toFixed(2);
const botonPago = document.getElementById("boton_pago");

botonPago.addEventListener("click", async () => {
	const spinner = document.createElement("div");
	spinner.classList.add("purchase-loader");
	botonPago.replaceWith(spinner);

	await fetch(`/api/carts/${cartId}/purchase`, {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		body: JSON.stringify({ amount: value }),
	});
	window.location.href = "/purchase-successful";
});
