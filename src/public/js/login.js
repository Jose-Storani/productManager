const loginForm = document.querySelector(".login");
if (loginForm) {
	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		let userData = {
			email: loginForm[0].value,
			password: loginForm[1].value,
		};
		const options = {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify(userData),
		};

		fetch("/api/sessions/login", options)
			.then((response) => response.json())
			.then((data) => {
				if (data.hasOwnProperty("name")) {
					if (data.code === 403) {
						alert(
							"La cuenta ha sido bloqueada debido a múltiples intentos fallidos. Por favor, contáctese con el administrador."
						);

					} else {
						const parrafo = document.querySelector("form p");
						parrafo.style.display = "flex";
						if (parrafo.classList.contains("shaker")) {
							parrafo.classList.remove("shaker");
						} else {
							parrafo.classList.add("shaker");
						}
					}
				} else {
					window.location.href = "/products";
				}
			});
	});
}
