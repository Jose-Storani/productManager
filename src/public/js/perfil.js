document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.getElementById("productContainer");

    const userLog = await fetch("/perfil");
    const userInfo = await userLog.json();
    console.log(userInfo)
})