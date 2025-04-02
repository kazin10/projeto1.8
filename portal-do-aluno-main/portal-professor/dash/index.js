function login(event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    console.log("email:", email);
    var pass = document.getElementById("password").value;

    if (email === "admin@gmail.com" && pass === "admin") {
        window.location.href = '/portal-professor/dash/dashboard.html';
    } else {
        console.log("Email ou Senha incorretos!");
    }
}
