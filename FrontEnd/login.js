
const errorMessage = document.getElementById("error-msg-login");


document.getElementById("btn-login").addEventListener("click", async (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    e.preventDefault();

    
    const response = await fetch("http://localhost:5678/api/users/login", {// Effectue une requête POST asynchrone vers l'API de connexion utilisateur
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
    });
    const body = await response.json();

   
    if (body.token === undefined) { // Vérifie le token token
        errorMessage.textContent = "E-mail ou Mot de passe incorrect";// cas ou pas de Token valide
    } else {
        setLocalStorageItem("token", body.token);// stock le token dans le local storage
        window.location.href = "index.html";
    }
});

function setLocalStorageItem(key, content) {
    localStorage.setItem(key, content);
}