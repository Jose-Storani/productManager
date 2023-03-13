document.addEventListener("DOMContentLoaded", async()=>{
    const session = await fetch("/api/sessions");
    const sessionJson = await session.json();
    const buttonsHidden = document.querySelectorAll(".login");
    if(sessionJson.hasOwnProperty("email")){
        buttonsHidden.forEach((e)=>{
            e.setAttribute("hidden","hidden")
        })
    }
}
)


    
