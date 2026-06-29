document.addEventListener('DOMContentLoaded', async () => {
    // 1. Mostrar el usuario en el header decodificando el Token
    mostrarUsuarioLogueado();

    // 2. Traer los datos de la API e inyectarlos
    await cargarMetricas();
});

function mostrarUsuarioLogueado() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        try {
            // El payload del JWT es la segunda parte separada por un punto
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            // Decodificamos de Base64 a texto plano
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const payload = JSON.parse(jsonPayload);
            
            // Spring Security guarda el email en la propiedad 'sub' (subject)
            document.getElementById('userEmailDisplay').innerText = payload.sub || "Administrador";
        } catch (error) {
            console.error("Error decodificando el token:", error);
        }
    }
}

async function cargarMetricas() {
    try {
        // Usamos authFetch que creamos en api.js para que inyecte el Bearer Token automáticamente
        const response = await authFetch('/dashboard');
        
        if (!response) return; // Si la sesión expiró, authFetch ya nos redirigió al login

        if (!response.ok) {
            throw new Error("Error obteniendo los datos del servidor");
        }

        const data = await response.json();

        // 1. Llenar las Tarjetas Estadísticas
        document.getElementById('stat-total-brigadas').innerText = data.totalBrigadasRegistradas;
        document.getElementById('stat-oro-inscripciones').innerText = data.totalOroRecaudadoInscripciones + " g";
        document.getElementById('stat-oro-deuda').innerText = data.totalOroDeudaArrime + " g";

        // 2. Llenar la Tabla de Morosos
        const tbody = document.getElementById('morososTableBody');
        tbody.innerHTML = ''; // Borrar el mensaje de "Cargando..."

        if (data.topMorosos && data.topMorosos.length > 0) {
            data.topMorosos.forEach(moroso => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong style="color: #eab308;">${moroso.numeroUnicoRegistro}</strong></td>
                    <td>${moroso.nombreBrigada}</td>
                    <td><span style="color: #ef4444; font-weight: bold;">${moroso.mesesAtraso} mes(es)</span></td>
                    <td>${moroso.deudaTotalOro} g</td>
                    <td>
                        <button class="btn-action" onclick="verBrigada('${moroso.brigadaId}')">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            // Si nadie debe dinero, mostramos un mensaje de éxito
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: #22c55e; padding: 2rem;">
                        <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                        Todas las brigadas están solventes con su Plan de Arrime.
                    </td>
                </tr>
            `;
        }

    } catch (error) {
        console.error("Error crítico:", error);
        const tbody = document.getElementById('morososTableBody');
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #ef4444;">
                    <i class="fas fa-times-circle"></i> Ocurrió un error al cargar las métricas. Verifica que la API esté encendida.
                </td>
            </tr>
        `;
    }
}

// Función temporal para el botón de la tabla
function verBrigada(id) {
    // Más adelante esto nos llevará a views/brigadas.php?id=...
    alert("Pronto te redirigiremos a gestionar la brigada: " + id);
}