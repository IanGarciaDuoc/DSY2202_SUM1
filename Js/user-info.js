document.addEventListener('DOMContentLoaded', function() {
    const userInfoElement = document.getElementById('user-info');
    const user = JSON.parse(localStorage.getItem('login_success'));

    if (user) {
        userInfoElement.innerHTML = `Bienvenido, ${user.name}`;
    } else {
        userInfoElement.innerHTML = `<a href="loggin.html" class="btn btn-primary">Iniciar Sesión</a>`;
    }
});