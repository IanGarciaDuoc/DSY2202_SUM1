document.addEventListener('DOMContentLoaded', function() {
    var formPago = document.getElementById('form-pago');

    formPago.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

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
                text: 'Tu pago se ha procesado correctamente. Serás redirigido al login.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Vaciar el carrito y resetear el total
                    vaciarCarritoCompleto();
                    // Informa al usuario que será redirigido y luego redirige a la página de login
                    Swal.fire({
                        title: 'Redirigiendo...',
                        text: 'Serás redirigido al Inicio.',
                        icon: 'info',
                        timer: 2000,
                        timerProgressBar: true,
                        willClose: () => {
                            window.location.href = 'index.html'; // Asegúrate de que el nombre de la página de login sea correcto
                        }
                    });
                }
            });
        }, 2000);
    });
});

function vaciarCarritoCompleto() {
    // Función para vaciar el carrito en el DOM
    const lista = document.querySelector('#lista-carrito tbody');
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    // Actualizar el total
    const totalCarrito = document.getElementById('total-carrito');
    totalCarrito.textContent = 'Total: $0.00';
    // Vaciar el carrito en localStorage
    localStorage.removeItem('carrito');
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    let total = 0;
    const productos = lista.querySelectorAll('tr');
    productos.forEach(producto => {
        const precioElemento = producto.querySelector('td:nth-child(3)').textContent;
        const precio = parseFloat(precioElemento.replace('$', ''));
        total += precio;
    });
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para cargar el carrito desde localStorage
function cargarCarritoLocalStorage() {
    const productos = JSON.parse(localStorage.getItem('carrito')) || [];
    productos.forEach(producto => insertarCarrito(producto));
}

// Obtener los elementos del DOM necesarios para la manipulación del carrito
const carrito = document.getElementById('carrito');
const producto = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const pagarBtn = document.getElementById('pagar'); // Nuevo botón para pagar
const totalCarrito = document.getElementById('total-carrito'); // Nuevo elemento para el total

// Event Listeners para agregar funcionalidades de click
cargarEventListeners();

// Cargar el carrito desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarritoLocalStorage);

function cargarEventListeners() {
    if (producto) {
        // Añade un producto al hacer clic en "Agregar al Carrito"
        producto.addEventListener('click', agregarProducto);
    }

    if (carrito) {
        // Elimina productos del carrito
        carrito.addEventListener('click', eliminarProducto);
    }

    if (vaciarCarritoBtn) {
        // Vaciar el carrito
        vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    }

    if (pagarBtn) {
        // Pagar el carrito
        pagarBtn.addEventListener('click', pagarCarrito);
    }
}

// Función que maneja la adición de un producto al carrito
function agregarProducto(e) {
    e.preventDefault();
    // Delegación para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
        Swal.fire({
            title: 'Producto Agregado',
            text: 'Producto agregado al carrito!',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }
}

// Lee los datos del producto
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Inserta en el HTML del carrito
    insertarCarrito(infoProducto);
}

// Muestra el producto seleccionado en el Carrito
function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
        </td>
    `;
    lista.appendChild(row);
    guardarCarritoLocalStorage();
    actualizarTotal(); // Actualiza el total después de insertar el producto
}

// Elimina el producto del carrito en el DOM
function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        actualizarTotal(); // Actualiza el total después de eliminar un producto
        guardarCarritoLocalStorage();
        Swal.fire({
            title: 'Producto Eliminado',
            text: 'Producto eliminado del carrito!',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }
}

// Vacía el carrito
function vaciarCarrito() {
    if (lista.childElementCount === 0) {
        Swal.fire({
            title: 'Error',
            text: 'El carrito ya está vacío.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    } else {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        actualizarTotal(); // Actualiza el total después de vaciar el carrito
        guardarCarritoLocalStorage();
        Swal.fire({
            title: 'Carrito Vacío',
            text: 'Carrito vaciado con éxito!',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }
}

// Función para guardar el carrito en localStorage
function guardarCarritoLocalStorage() {
    const productos = [];
    lista.querySelectorAll('tr').forEach(producto => {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('td:nth-child(2)').textContent,
            precio: producto.querySelector('td:nth-child(3)').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        };
        productos.push(infoProducto);
    });
    localStorage.setItem('carrito', JSON.stringify(productos));
}

// Función para manejar el evento de pago
function pagarCarrito(e) {
    e.preventDefault();
    const total = parseFloat(totalCarrito.textContent.replace('Total: $', ''));

    if (total === 0) {
        Swal.fire({
            title: 'Error',
            text: 'No hay productos en el carrito. Añade productos antes de proceder al pago.',
            icon: 'error',
            confirmButtonText: 'Cerrar',
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                content: 'swal2-content',
                confirmButton: 'swal2-confirm'
            }
        });
    } else {
        // Abrir el modal de pago
        $('#modalPago').modal('show');
    }
}


document.getElementById('logout-button').addEventListener('click', function() {
    // Aquí tu código para manejar el cierre de sesión
    // Por ejemplo, eliminar cookies o datos de sesión
    alert('Has cerrado sesión'); // Simplemente una alerta para demostración

    // Redirigir al usuario a la página de inicio o de inicio de sesión
    window.location.href = 'loggin.html'; // Modifica según necesidad
});