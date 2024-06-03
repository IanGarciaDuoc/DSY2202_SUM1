document.addEventListener('DOMContentLoaded', function() {
    const adminMenuItem = document.getElementById('adminMenuItem');
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'; // Obtén el estado de administrador desde sessionStorage

    if (!isAdmin) {
        adminMenuItem.style.display = 'none';
    } else {
        adminMenuItem.style.display = 'block';
    }
});
