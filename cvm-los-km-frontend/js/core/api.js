// js/core/api.js
const API_URL = 'http://localhost:8080/api/v1';

// Función para peticiones públicas (como el Login)
async function publicFetch(endpoint, options = {}) {
    options.headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    const response = await fetch(`${API_URL}${endpoint}`, options);
    return response;
}

// Función para peticiones protegidas (Inyecta el Token)
async function authFetch(endpoint, options = {}) {
    const token = localStorage.getItem('jwt_token');
    
    if (!token) {
        window.location.href = '/cvm-los-km-frontend/index.php'; // Expulsar si no hay token
        return;
    }

    options.headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    if (response.status === 401 || response.status === 403) {
        alert("Sesión expirada o sin permisos.");
        localStorage.removeItem('jwt_token');
        window.location.href = '/cvm-los-km-frontend/index.php';
    }
    
    return response;
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        const payload = JSON.parse(decodeURIComponent(atob(token.split('.')[1]).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
        
        // Spring Security suele guardar los roles como un array o un string "ROLE_ADMIN"
        const roles = payload.roles || payload.authorities || []; 
        const esAdmin = roles.includes('ROLE_ADMIN') || roles.includes('ADMIN');
        const esManager = roles.includes('ROLE_MANAGER') || roles.includes('MANAGER');

        if (esAdmin) {
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
        }
        if (esManager) {
            document.querySelectorAll('.manager-only').forEach(el => el.style.display = 'block');
        }
    }
});

// --- CONTROL DE ACCESO AL MENÚ LATERAL ---
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwt_token');
    
    if (token) {
        try {
            // 1. Decodificar el Token JWT para leer su contenido (Payload)
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            
            // 2. Buscar qué rol tiene el usuario. 
            // Convertimos todo el contenido de roles a texto para atraparlo sin importar 
            // si Spring Boot lo guardó como "ROLE_ADMIN", "ADMIN", o dentro de un Array.
            const contenidoRoles = JSON.stringify(payload).toUpperCase();
            
            const esAdmin = contenidoRoles.includes('ADMIN');
            const esManager = contenidoRoles.includes('MANAGER');

            // 3. Revelar las opciones ocultas del menú según el rol
            if (esAdmin) {
                // El Admin ve todo (Estadísticas y Usuarios)
                document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
            }
            
            if (esManager) {
                // El Manager solo ve Estadísticas (no ve Usuarios)
                document.querySelectorAll('.manager-only').forEach(el => el.style.display = 'block');
            }

        } catch (error) {
            console.error("Error leyendo los permisos del usuario:", error);
        }
    }
});