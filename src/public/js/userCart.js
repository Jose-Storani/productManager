const deleteProductButton = document.querySelectorAll(".deleteProductButton");

deleteProductButton.forEach((button) => {
	const productId = button.id;
	button.addEventListener("click", async () => {
		await fetch(`/api/carts/${cartId}/product/${productId}`, {
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
