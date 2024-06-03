document.addEventListener('DOMContentLoaded', function () {
    const userTableBody = document.getElementById('userTableBody');
    const editUserForm = document.getElementById('editUserForm');
    const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    let editUserId = null;

    // Función para cargar usuarios en la tabla
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userTableBody.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" data-index="${index}" onclick="editUser(this)">Editar</button>
                    <button class="btn btn-danger btn-sm" data-index="${index}" onclick="deleteUser(this)">Eliminar</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // Función para editar un usuario
    window.editUser = function (button) {
        const index = button.getAttribute('data-index');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users[index];

        editUserId = index;
        document.getElementById('editName').value = user.name;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editPassword').value = user.password;
        editUserModal.show();
    };

    // Función para eliminar un usuario
    window.deleteUser = function (button) {
        const index = button.getAttribute('data-index');
        const users = JSON.parse(localStorage.getItem('users')) || [];

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                users.splice(index, 1);
                localStorage.setItem('users', JSON.stringify(users));
                loadUsers();
                Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
            }
        });
    };

    // Guardar cambios al editar un usuario
    editUserForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('editName').value;
        const email = document.getElementById('editEmail').value;
        const password = document.getElementById('editPassword').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users[editUserId] = { name, email, password };

        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
        editUserModal.hide();
        Swal.fire('Guardado', 'El usuario ha sido actualizado.', 'success');
    });

    // Cargar usuarios al iniciar
    loadUsers();
});
document.addEventListener('DOMContentLoaded', function() {
    const createUserForm = document.getElementById('createUserForm');

    createUserForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío por defecto del formulario

        // Recoger los datos del formulario
        const userName = document.getElementById('newUserName').value.trim();
        const userEmail = document.getElementById('newUserEmail').value.trim();
        const userPassword = document.getElementById('newUserPassword').value;

        // Validaciones simples
        if (!userName || !userEmail || !userPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, rellene todos los campos.'
            });
            return;
        }

        // Comprobar si el usuario ya existe
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === userEmail);

        if (userExists) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ya existe un usuario con este correo electrónico.'
            });
            return;
        }

        // Añadir el nuevo usuario al array de usuarios
        users.push({
            name: userName,
            email: userEmail,
            password: userPassword
        });

        // Guardar el array actualizado en localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Cerrar el modal y limpiar el formulario
        $('#createUserModal').modal('hide');
        createUserForm.reset();

        // Mostrar un mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El usuario ha sido creado con éxito.'
        });

        // Opcional: Actualizar la lista de usuarios en la interfaz
        updateUsersTable();
    });

    function updateUsersTable() {
        const userTableBody = document.getElementById('userTableBody');
        userTableBody.innerHTML = ''; // Limpiar la tabla
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            const row = document.createElement('tr');
    
            const nameCell = document.createElement('td');
            nameCell.textContent = user.name;
            row.appendChild(nameCell);
    
            const emailCell = document.createElement('td');
            emailCell.textContent = user.email;
            row.appendChild(emailCell);
    
            const actionCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn', 'btn-primary');
            editButton.onclick = function() { editUser(user.email); };
            actionCell.appendChild(editButton);
    
            // Crear y añadir el botón Eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.onclick = function() { deleteUser(user.email); };
            actionCell.appendChild(deleteButton);
    
            row.appendChild(actionCell);
    
            userTableBody.appendChild(row);
        });
    }
    
    function deleteUser(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.filter(user => user.email !== email);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        updateUsersTable(); // Actualizar la tabla después de eliminar el usuario
    }
    
    
    
});
