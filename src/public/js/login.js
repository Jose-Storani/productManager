
const loginForm = document.querySelector(".login");
console.log(loginForm)
console.log(loginForm[0])
console.log(loginForm[1])

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
.then(data => console.log(data))
})