const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden.'
        });
        return; // Detiene la ejecución adicional si las contraseñas no coinciden
    }

    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserRegistered = Users.find(user => user.email === email);
    if (isUserRegistered) {
        Swal.fire({
            icon: 'error',
            title: 'Registrado',
            text: 'El usuario ya está registrado.'
        });
        return;
    }

    Users.push({ name: name, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(Users));
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Registro exitoso.'
    }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
            window.location.href = 'loggin.html'; // Redireccionar después de confirmar
        }
    });
});
