document.addEventListener('DOMContentLoaded', function() {
    var formPago = document.getElementById('form-pago');

    formPago.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Validaciones
        var nombre = document.getElementById('nombre').value.trim();
        var email = document.getElementById('email').value.trim();
        var direccion = document.getElementById('direccion').value.trim();
        var tarjeta = document.getElementById('tarjeta').value.trim();
        var fechaExpiracion = document.getElementById('fecha-expiracion').value.trim();
        var cvv = document.getElementById('cvv').value.trim();

        var valid = true; // Variable para determinar si el formulario es válido

        // Validar que el nombre no esté vacío
        if (nombre === '') {
            Swal.fire({
                title: 'Error',
                text: 'El nombre no puede estar vacío.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            valid = false;
        }

        // Validar que el email tenga un formato correcto
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title: 'Error',
                text: 'El correo electrónico no es válido.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            valid = false;
        }

        // Validar que la dirección no esté vacía
        if (direccion === '') {
            Swal.fire({
                title: 'Error',
                text: 'La dirección no puede estar vacía.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            valid = false;
        }

        // Validar que el número de tarjeta tenga 16 dígitos (sin contar los espacios)
        var tarjetaSinEspacios = tarjeta.replace(/\s/g, '');
        if (tarjetaSinEspacios.length !== 16) {
            Swal.fire({
                title: 'Error',
                text: 'El número de tarjeta debe tener 16 dígitos.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            valid = false;
        }

        // Validar que la fecha de expiración tenga el formato MM/AA
        var fechaExpiracionRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!fechaExpiracionRegex.test(fechaExpiracion)) {
            Swal.fire({
                title: 'Error',
                text: 'La fecha de expiración debe tener el formato MM/AA.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            valid = false;
        }

        // Validar que el CVV tenga exactamente 3 dígitos
        if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
            Swal.fire({
                title: 'Error',
                text: 'El CVV debe tener exactamente 3 dígitos.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
            valid = false;
        }

        if (!valid) {
            return; // Detener el proceso si hay errores de validación
        }

        // Simular proceso de pago
        Swal.fire({
            title: 'Procesando Pago',
            text: 'Por favor, espera...',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        // Simular un retardo en el procesamiento del pago
        setTimeout(() => {
            Swal.fire({
                title: 'Pago Exitoso',
                text: 'Tu pago se ha procesado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Vaciar el carrito y resetear el total
                    vaciarCarritoCompleto();
                    // Redirigir a una página de confirmación o de agradecimiento
                    window.location.href = 'index.html';
                }
            });
        }, 2000);
    });

    // Formatear número de tarjeta con espacios cada 4 dígitos
    var tarjetaInput = document.getElementById('tarjeta');
    tarjetaInput.addEventListener('input', function() {
        var value = tarjetaInput.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (value.length > 16) value = value.slice(0, 16);
        var formattedValue = value.match(/.{1,4}/g)?.join(' ') ?? '';
        tarjetaInput.value = formattedValue;
    });

    // Formatear fecha de expiración a MM/AA
    var fechaExpiracionInput = document.getElementById('fecha-expiracion');
    fechaExpiracionInput.addEventListener('input', function() {
        var value = fechaExpiracionInput.value.replace(/[^0-9]/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        if (value.length > 5) value = value.slice(0, 5);
        fechaExpiracionInput.value = value;
    });

    // Limitar el CVV a 3 dígitos
    var cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function() {
        var value = cvvInput.value.replace(/[^0-9]/g, '');
        if (value.length > 3) value = value.slice(0, 3);
        cvvInput.value = value;
    });
});

function vaciarCarritoCompleto() {
    // Vaciar el carrito en el DOM
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    // Actualizar el total
    actualizarTotal();
    // Vaciar el carrito en localStorage
    localStorage.removeItem('carrito');
    // Actualizar el texto del total en el DOM
    totalCarrito.textContent = 'Total: $0.00';
}
