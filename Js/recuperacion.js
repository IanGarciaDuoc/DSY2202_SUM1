document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('emailRecovery');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene la recarga de la página al enviar el formulario

        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            Swal.fire({
                title: 'Error!',
                text: 'Por favor, ingrese un correo electrónico válido.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        } else {
            Swal.fire({
                title: 'Correo enviado',
                text: 'Se ha enviado un correo de recuperación de contraseña a ' + email,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Aquí puedes añadir lógica adicional si es necesario, como redirigir a otra página
            });
        }
    });

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo electrónico
        return pattern.test(email);
    }
});
