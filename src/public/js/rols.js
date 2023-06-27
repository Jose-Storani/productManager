const changeRol = document.querySelectorAll(".changeRolButton");
const deleteUser = document.querySelectorAll(".deleteUser");
const deleteInactive = document.getElementById("deleteInactiveUsers");
const deleteLoading = document.querySelector(".disabled");

changeRol.forEach((button)=>{
button.addEventListener("click", async ()=>{
	const response = await fetch("/api/users/changing-rol",{
		method: "POST",
		headers:{
			"Content-type": "application/json; charset=UTF-8"
		},
		body:JSON.stringify({id:button.id})
	});

	const data = await response.json();
	alert(data.data)
	window.location.href="/change-rol"
})
})

deleteUser.forEach((deleteButton)=>{
	const USER_ID = deleteButton.id;
	deleteButton.addEventListener("click", async()=>{
		const responseJSON = await fetch("/api/users/delete-by-id",{
			method:"DELETE",
			headers:{
				"Content-type": "application/json; charset=UTF-8"
			},
			body:JSON.stringify({USER_ID})
		});
		alert("Usuario eliminado con éxito")
		window.location.href="/change-rol";
	})
})

deleteInactive.addEventListener("click", async ()=>{
	try {
	deleteLoading.setAttribute("class","visible");
	let response = await fetch("/api/users",{
		method:"DELETE",
		headers:{
			"Content-type": "application/json; charset=UTF-8"
		}
	})
	if(response.ok){
		const responseJSON = await response.json();
	deleteLoading.setAttribute("class","disabled");
	alert("Usuarios inactivos eliminados con éxito");
	window.location.href="/change-rol";
	}
	else{
		alert("No hay usuarios inactivos para eliminar");
	}
	
}
	catch (error) {
		console.log(error)
	}
})
