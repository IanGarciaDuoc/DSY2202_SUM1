const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Por favor, ingresa tu correo electrónico y contraseña.'
        });
        return;
    }

    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = Users.find(user => user.email === email && user.password === password);

    if (!validUser) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario y/o contraseña incorrectos!'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: `Bienvenido ${validUser.name}`
        }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
                const isAdmin = email.endsWith('@admin.cl');
                sessionStorage.setItem('login_success', JSON.stringify(validUser));
                sessionStorage.setItem('isAdmin', isAdmin); // Guardar si el usuario es administrador
                window.location.href = 'index.html'; // Redirige a la página principal
            }
        });
    }
});



