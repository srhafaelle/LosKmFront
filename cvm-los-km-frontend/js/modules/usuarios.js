document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();

    document.getElementById('usuarioForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarUsuario();
    });
});

async function cargarUsuarios() {
    try {
        const response = await authFetch('/usuarios'); // Endpoint de Spring Boot
        if (!response) return;

        const usuarios = await response.json();
        const tbody = document.getElementById('usuariosTableBody');
        tbody.innerHTML = '';

        if (usuarios.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay usuarios registrados.</td></tr>';
            return;
        }

        usuarios.forEach(u => {
            // Darle color a los roles para que se vean bien
            let colorRol = '#94a3b8'; // Gris default (USER)
            let nombreRol = 'Operador';
            
            if (u.role === 'ROLE_ADMIN' || u.role === 'ADMIN') { colorRol = '#ef4444'; nombreRol = 'Administrador'; }
            if (u.role === 'ROLE_MANAGER' || u.role === 'MANAGER') { colorRol = '#3b82f6'; nombreRol = 'Gerente'; }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${u.email}</strong></td>
                <td><span style="background: ${colorRol}20; color: ${colorRol}; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">${nombreRol}</span></td>
                <td><span style="color: #22c55e;">Activo</span></td>
                <td>
                    <button class="btn-action" style="background-color: #eab308; color: #121820;" onclick='abrirModalUsuario(${JSON.stringify(u)})'>
                        <i class="fas fa-edit"></i> Modificar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        alert("Error cargando la lista de personal.");
    }
}

function abrirModalUsuario(usuario = null) {
    const modal = document.getElementById('usuarioModal');
    const form = document.getElementById('usuarioForm');
    form.reset();

    if (usuario) {
        document.getElementById('modalUsuarioTitle').innerText = "Modificar Usuario";
        document.getElementById('usuarioId').value = usuario.id;
        document.getElementById('userEmail').value = usuario.email;
        document.getElementById('userRole').value = usuario.role;
        
        // Si edita, la clave es opcional
        document.getElementById('userPassword').required = false;
        document.getElementById('passHelp').innerText = "(Dejar en blanco para no cambiarla)";
    } else {
        document.getElementById('modalUsuarioTitle').innerText = "Registrar Nuevo Usuario";
        document.getElementById('usuarioId').value = '';
        
        // Si es nuevo, la clave es obligatoria
        document.getElementById('userPassword').required = true;
        document.getElementById('passHelp').innerText = "(Obligatoria)";
    }

    modal.classList.add('active');
}

function cerrarModal(id) {
    document.getElementById(id).classList.remove('active');
}

async function guardarUsuario() {
    const id = document.getElementById('usuarioId').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const role = document.getElementById('userRole').value;

    const payload = { email, role };
    if (password) payload.password = password; // Solo enviamos la clave si escribió algo

    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `/usuarios/${id}` : '/usuarios'; // Ajusta esto si tu endpoint de crear es /auth/register

    const btn = document.getElementById('btnGuardarUsuario');
    btn.disabled = true;
    btn.innerText = "Guardando...";

    try {
        const response = await authFetch(endpoint, {
            method: method,
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            cerrarModal('usuarioModal');
            cargarUsuarios();
            alert("Usuario guardado correctamente.");
        } else {
            const err = await response.json();
            alert(err.message || "Error al procesar la solicitud.");
        }
    } catch (error) {
        alert("Error de conexión.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Guardar Usuario";
    }
}