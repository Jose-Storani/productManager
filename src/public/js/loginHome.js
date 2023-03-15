

document.addEventListener("DOMContentLoaded", async()=>{
    const session = await fetch("/api/sessions");
    const sessionJson = await session.json();
    const buttonsHidden = document.querySelectorAll(".login");
    const profileButton = document.getElementById("profile");
    if(sessionJson.hasOwnProperty("email")){
        buttonsHidden.forEach((e)=>{
            e.setAttribute("hidden","hidden")
        })
    
    }
    else{
        profileButton.setAttribute("hidden","hidden")
    }
}
)

// setInterval( async ()=>{
//     const session = await fetch("/api/sessions");
//     const sessionJson = await session.json();
//     console.log(sessionJson)
// }, 1000)


    
