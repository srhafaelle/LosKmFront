// js/auth/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Si ya está logueado, mandarlo directo al dashboard
    if (localStorage.getItem('jwt_token')) {
        window.location.href = 'views/dashboard.php';
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitar que la página recargue
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btnSubmit = document.getElementById('btnSubmit');

        btnSubmit.disabled = true;
        btnSubmit.innerText = "Verificando...";
        errorMessage.style.display = 'none';

        try {
            const response = await publicFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // ¡Éxito! Guardamos el token y vamos al dashboard
                localStorage.setItem('jwt_token', data.token);
                window.location.href = 'views/dashboard.php';
            } else {
                // Mostrar error del backend (ej: Credenciales incorrectas)
                errorMessage.innerText = data.message || "Error al iniciar sesión";
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            errorMessage.innerText = "Error de conexión con el servidor.";
            errorMessage.style.display = 'block';
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerText = "Ingresar al Sistema";
        }
    });
});