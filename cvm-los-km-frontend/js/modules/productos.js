document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

    document.getElementById('productoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarProducto();
    });
});

async function cargarProductos() {
    try {
        const response = await authFetch('/productos');
        if (!response) return;

        const productos = await response.json();
        const tbody = document.getElementById('productosTableBody');
        tbody.innerHTML = '';

        if (productos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay productos registrados.</td></tr>';
            return;
        }

        productos.forEach(prod => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${prod.nombre}</strong><br><small style="color: #64748b;">${prod.descripcion}</small></td>
                <td><span style="background: #334155; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${prod.unidad}</span></td>
                <td class="letter-yellow" style="font-weight: bold;">${prod.precioOro} g</td>
                <td><span style="color: ${prod.activo ? '#22c55e' : '#ef4444'}">${prod.activo ? 'Activo' : 'Inactivo'}</span></td>
                <td>
                    <button class="btn-action" onclick='abrirModal(${JSON.stringify(prod)})'>
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        alert("Error al cargar el inventario.");
    }
}

function abrirModal(producto = null) {
    const modal = document.getElementById('productoModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productoForm');

    form.reset(); 

    if (producto) {
        title.innerText = "Editar Producto";
        document.getElementById('productoId').value = producto.id;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('unidad').value = producto.unidad;
        document.getElementById('precioOro').value = producto.precioOro;
    } else {
        title.innerText = "Registrar Nuevo Producto";
        document.getElementById('productoId').value = '';
    }

    modal.classList.add('active'); 
}

function cerrarModal() {
    document.getElementById('productoModal').classList.remove('active');
}

async function guardarProducto() {
    const id = document.getElementById('productoId').value;
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const unidad = document.getElementById('unidad').value;
    const precioOro = parseFloat(document.getElementById('precioOro').value);

    const payload = { nombre, descripcion, unidad, precioOro };
    
    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `/productos/${id}` : '/productos';

    const btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.disabled = true;
    btnGuardar.innerText = "Guardando...";

    try {
        const response = await authFetch(endpoint, {
            method: method,
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            cerrarModal();
            cargarProductos(); 
        } else {
            const errorData = await response.json();
            alert(errorData.message || "Error al guardar el producto.");
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor.");
    } finally {
        btnGuardar.disabled = false;
        btnGuardar.innerText = "Guardar Producto";
    }
}