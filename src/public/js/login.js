
const loginForm = document.querySelector(".login");
if(loginForm){
loginForm.addEventListener("submit", async (e)=>{
e.preventDefault()
let userData = {
    email: loginForm[0].value,
    password:loginForm[1].value
}
const options = {
    method: "POST",
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(userData)
};

fetch("/api/sessions/login",options)
.then(response => response.json())
.then(data => {
    if(data.hasOwnProperty("error")){
        const parrafo = document.querySelector("form p")
        parrafo.style.display = "flex"
    }
    else{
        window.location.href = '/products';
    }

    
})
})
}