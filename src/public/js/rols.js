const changeRol = document.querySelectorAll(".changeRolButton");

changeRol.forEach((button)=>{
button.addEventListener("click", async ()=>{
	const response = await fetch("/api/users/changingRol",{
		method: "POST",
		headers:{
			"Content-type": "application/json; charset=UTF-8"
		},
		body:JSON.stringify({id:button.id})
	});

	const data = await response.json();
	alert(data.data)
	window.location.href="/changeRol"
})
})