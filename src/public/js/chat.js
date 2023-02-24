const socketChat = io();
let user;

//elementos traidos de la vista
const formulario = document.getElementById("formulario");
const inputMensaje = document.getElementById("mensaje");
const chatParrafo = document.getElementById("chat")

if(!user){
    Swal.fire({
    title: "Bienvenido",
    text: "Por favor identifiquese",
    input:"text",
    inputValidator:(value) =>{
        return !value && "Necesitas escribir un nombre de usuario para continuar"
    },
    allowOutsideClick:false
})
.then(result=>{
    user = result.value;
    socketChat.emit("newUser", user)
})
}

formulario.addEventListener("submit", (e)=>{
    e.preventDefault();           
            const info={
                user:user, message: inputMensaje.value
            }

            socketChat.emit("messageChat", info);
            inputMensaje.value = ""
            console.log(info);
        
        
})

socketChat.on("messageLogs",(dataMessages)=>{

    const chatRender = dataMessages.map(elem =>{
        return `<p><strong>${elem.user}:</strong>${elem.message}</p>`
    }).join(" ");
    
    chatParrafo.innerHTML = chatRender

    
    
})

//notificacion cada vez que ingrese un usuario al chat
socketChat.on("broadcast", (usuario)=>{
    Toastify({
        text: `Ingresó ${usuario} al chat`,
        duration: 5000,
        position: "right",
    }).showToast();
})