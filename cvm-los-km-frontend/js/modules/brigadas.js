document.addEventListener('DOMContentLoaded', () => {
    cargarBrigadas();
    cargarMinerosDropdown();
    cargarProductosDropdown();

    document.getElementById('mineroForm').addEventListener('submit', guardarMinero);
    document.getElementById('brigadaForm').addEventListener('submit', guardarBrigada);
    document.getElementById('despachoForm').addEventListener('submit', guardarDespacho);
});

// --- CARGA DE DATOS ---
async function cargarBrigadas() {
    try {
        const response = await authFetch('/brigadas');
        if (!response) return;
        const brigadas = await response.json();
        const tbody = document.getElementById('brigadasTableBody');
        tbody.innerHTML = '';

        if (brigadas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay brigadas registradas.</td></tr>';
            return;
        }

        brigadas.forEach(b => {
            const deuda = calcularDeuda(b);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong style="color: #eab308;">${b.numeroUnicoRegistro || 'N/A'}</strong></td>
                <td>${b.nombreBrigada}</td>
                <td class="letter-green" style="font-weight: bold;">${b.oroPagadoHastaLaFecha || 0} g</td>
                <td class="${deuda > 0 ? 'letter-yellow' : ''}" style="font-weight: bold;">${deuda} g</td>
                <td>
                  <button class="btn-action" style="background-color: #10b981; margin-right: 5px;" onclick="window.location.href='brigada_detalle.php?id=${b.id}'">
                   <i class="fas fa-eye"></i> Ver
                  </button>
                 <button class="btn-action" style="background-color: #3b82f6;" onclick="abrirModalDespacho('${b.id}', '${b.nombreBrigada}')">
                  <i class="fas fa-truck"></i> Despachar
                 </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        alert("Error cargando brigadas");
    }
}

async function cargarMinerosDropdown() {
    try {
        const response = await authFetch('/mineros');
        if (!response) return;
        const mineros = await response.json();
        const select = document.getElementById('mineroResponsableId');
        select.innerHTML = '<option value="">Seleccione un minero...</option>';
        mineros.forEach(m => {
            select.innerHTML += `<option value="${m.id}">${m.cedula} - ${m.nombres} ${m.apellidos}</option>`;
        });
    } catch (error) {
        console.error(error);
    }
}

async function cargarProductosDropdown() {
    try {
        const response = await authFetch('/productos');
        if (!response) return;
        const productos = await response.json();
        const select = document.getElementById('despachoProductoId');
        select.innerHTML = '<option value="">Seleccione un producto...</option>';
        productos.forEach(p => {
            if(p.activo) {
                select.innerHTML += `<option value="${p.id}">${p.nombre} (${p.precioOro} g / ${p.unidad})</option>`;
            }
        });
    } catch (error) {
        console.error(error);
    }
}
// Calcular el costo en oro automáticamente al seleccionar producto o escribir cantidad
document.getElementById('despachoProductoId').addEventListener('change', calcularTotalVenta);
document.getElementById('despachoCantidad').addEventListener('input', calcularTotalVenta);

function calcularTotalVenta() {
    const selectProducto = document.getElementById('despachoProductoId');
    const cantidad = parseFloat(document.getElementById('despachoCantidad').value) || 0;
    
    // Obtenemos el precio del atributo data-precio que guardamos en el select
    const opcionSeleccionada = selectProducto.options[selectProducto.selectedIndex];
    const precioOro = parseFloat(opcionSeleccionada.getAttribute('data-precio')) || 0;
    
    const total = cantidad * precioOro;
    document.getElementById('totalCobrarOro').innerText = total.toFixed(2) + " g";
}

// Asegúrate de modificar la función cargarProductosDropdown() para incluir el data-precio:
async function cargarProductosDropdown() {
    try {
        const response = await authFetch('/productos');
        if (!response) return;
        const productos = await response.json();
        
        const select = document.getElementById('despachoProductoId');
        select.innerHTML = '<option value="" data-precio="0">Seleccione un producto...</option>';
        
        let productosListados = 0;

        productos.forEach(p => {
            // Si el backend manda null en el stock (porque el producto es viejo), lo tratamos como 0
            const stockReal = p.stockDisponible || 0;

            if (p.activo) {
                if (stockReal > 0) {
                    // Si tiene stock, lo mostramos normal para vender
                    select.innerHTML += `<option value="${p.id}" data-precio="${p.precioOro}">${p.nombre} (${p.precioOro} g) - Quedan: ${stockReal}</option>`;
                    productosListados++;
                } else {
                    // Si NO tiene stock, lo mostramos deshabilitado para que el vendedor sepa por qué no puede seleccionarlo
                    select.innerHTML += `<option value="${p.id}" disabled style="color: #ef4444;">${p.nombre} - AGOTADO (Stock: 0)</option>`;
                }
            }
        });

        if (productosListados === 0 && productos.length > 0) {
            console.warn("Todos los productos están agotados.");
        }

    } catch (error) { 
        console.error("Error al cargar los productos en el select:", error); 
    }
}
function calcularDeuda(brigada) {
    if (!brigada.historialCuotas) return 0;
    return brigada.historialCuotas.reduce((acc, cuota) => acc + (cuota.montoExigidoOro - cuota.montoPagadoOro), 0);
}

// --- CONTROL DE MODALES ---
function abrirModalMinero() { document.getElementById('mineroModal').classList.add('active'); }
function abrirModalBrigada() { document.getElementById('brigadaModal').classList.add('active'); }
function abrirModalDespacho(id, nombre) {
    document.getElementById('despachoBrigadaId').value = id;
    document.getElementById('despachoBrigadaNombre').innerText = `Brigada: ${nombre}`;
    document.getElementById('despachoModal').classList.add('active');
}
function cerrarModal(id) { 
    document.getElementById(id).classList.remove('active');
    if(id === 'mineroModal') document.getElementById('mineroForm').reset();
    if(id === 'brigadaModal') document.getElementById('brigadaForm').reset();
    if(id === 'despachoModal') document.getElementById('despachoForm').reset();
}

// --- SUBMITS ---
async function guardarMinero(e) {
    e.preventDefault();
    const payload = {
        nombres: document.getElementById('mineroNombres').value,
        apellidos: document.getElementById('mineroApellidos').value,
        cedula: document.getElementById('mineroCedula').value,
        cargo: document.getElementById('mineroCargo').value
    };
    
    document.getElementById('btnGuardarMinero').disabled = true;
    try {
        const response = await authFetch('/mineros', { method: 'POST', body: JSON.stringify(payload) });
        if(response.ok) {
            cerrarModal('mineroModal');
            cargarMinerosDropdown(); 
            alert("Minero registrado exitosamente");
        } else {
            const err = await response.json();
            alert(err.message || "Error al registrar minero");
        }
    } catch(err) { alert("Error de red"); }
    document.getElementById('btnGuardarMinero').disabled = false;
}

async function guardarBrigada(e) {
    e.preventDefault();
    const payload = {
        nombreBrigada: document.getElementById('nombreBrigada').value,
        mineroResponsableId: document.getElementById('mineroResponsableId').value
    };
    
    document.getElementById('btnGuardarBrigada').disabled = true;
    try {
        const response = await authFetch('/brigadas', { method: 'POST', body: JSON.stringify(payload) });
        if(response.ok) {
            cerrarModal('brigadaModal');
            cargarBrigadas(); 
        } else {
            const err = await response.json();
            alert(err.message || "Error al crear brigada");
        }
    } catch(err) { alert("Error de red"); }
    document.getElementById('btnGuardarBrigada').disabled = false;
}

async function guardarDespacho(e) {
    e.preventDefault();
    const idBrigada = document.getElementById('despachoBrigadaId').value;
    const payload = {
        productoId: document.getElementById('despachoProductoId').value,
        cantidad: parseFloat(document.getElementById('despachoCantidad').value)
    };
    
    document.getElementById('btnGuardarDespacho').disabled = true;
    try {
        const response = await authFetch(`/brigadas/${idBrigada}/despachos`, { method: 'POST', body: JSON.stringify(payload) });
        if(response.ok) {
            cerrarModal('despachoModal');
            alert("Despacho registrado correctamente");
            // Aquí en el futuro podríamos recargar la vista interna de la brigada
        } else {
            const err = await response.json();
            alert(err.message || "Error al despachar");
        }
    } catch(err) { alert("Error de red"); }
    document.getElementById('btnGuardarDespacho').disabled = false;
}