document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var contactNumber = document.getElementById('contactNumber').value.trim();

        if (!name || !email || !contactNumber) {
            event.preventDefault();
            Swal.fire({
                title: 'Error!',
                text: 'Por favor, completa los campos requeridos: Nombre, Email y Número de Contacto.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        } else {
            event.preventDefault(); // Puedes quitar esta línea si quieres que el formulario se envíe
            Swal.fire({
                title: 'Enviado',
                text: 'Formulario enviado correctamente. Serás contactado a la brevedad.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});
