// Obtenemos el ID de la URL (ej: brigada_detalle.php?id=ABC1234)
const urlParams = new URLSearchParams(window.location.search);
const brigadaId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    if (!brigadaId) {
        alert("No se especificó ninguna brigada.");
        window.location.href = 'brigadas.php';
        return;
    }

    cargarDetallesBrigada();

    document.getElementById('pagoForm').addEventListener('submit', procesarPago);
});

async function cargarDetallesBrigada() {
    try {
        const response = await authFetch(`/brigadas`); // Pedimos todas y filtramos, o si tienes un GET /brigadas/{id} úsalo directamente.
        if (!response) return;
        const brigadas = await response.json();
        
        // Buscamos la brigada actual (Si tienes endpoint GET by ID, es mejor cambiar esto)
        const brigada = brigadas.find(b => b.id === brigadaId);
        
        if (!brigada) {
            alert("Brigada no encontrada");
            window.location.href = 'brigadas.php';
            return;
        }

        // 1. Cabecera y QR
        document.getElementById('tituloBrigada').innerText = brigada.nombreBrigada;
        document.getElementById('subtituloBrigada').innerText = `NUR: ${brigada.numeroUnicoRegistro || 'Pendiente'}`;
        
        const qrImg = document.getElementById('qrCodeImage');
        if (brigada.numeroUnicoRegistro) {
            qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${brigada.numeroUnicoRegistro}`;
            qrImg.style.display = 'block';
        }

        // 2. Tarjetas
        document.getElementById('stat-inscripcion').innerText = `${brigada.oroPagadoHastaLaFecha || 0} / 20g`;
        if (brigada.oroPagadoHastaLaFecha >= 20) {
            document.getElementById('stat-inscripcion').classList.add('letter-green');
        }

        // 3. Tablas
        pintarDespachos(brigada.historialDespachos || []);
        pintarCuotas(brigada.historialCuotas || []);

        // Calcular Deuda
        let deudaTotal = 0;
        if (brigada.historialCuotas) {
            deudaTotal = brigada.historialCuotas.reduce((acc, c) => acc + (c.montoExigidoOro - c.montoPagadoOro), 0);
        }
        document.getElementById('stat-deuda').innerText = `${deudaTotal} g`;

    } catch (error) {
        console.error("Error al cargar detalles:", error);
    }
}

function pintarDespachos(despachos) {
    const tbody = document.getElementById('despachosTableBody');
    tbody.innerHTML = '';
    if (despachos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay despachos registrados.</td></tr>';
        return;
    }
    despachos.forEach(d => {
        const fecha = new Date(d.fechaDespacho).toLocaleDateString();
        tbody.innerHTML += `
            <tr>
                <td>${fecha}</td>
                <td><strong>${d.nombreProducto}</strong></td>
                <td>${d.cantidadEntregada}</td>
                <td style="color: #eab308; font-weight: bold;">${d.costoEnOro} g</td>
            </tr>
        `;
    });
}

function pintarCuotas(cuotas) {
    const tbody = document.getElementById('cuotasTableBody');
    tbody.innerHTML = '';
    if (cuotas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No tiene plan de arrime asignado.</td></tr>';
        return;
    }
    cuotas.forEach(c => {
        let colorEstado = '#94a3b8';
        if (c.estado === 'PAGADA') colorEstado = '#22c55e';
        if (c.estado === 'VENCIDA') colorEstado = '#ef4444';

        tbody.innerHTML += `
            <tr>
                <td>${c.periodo}</td>
                <td>${c.montoExigidoOro} g</td>
                <td>${c.montoPagadoOro} g</td>
                <td style="color: ${colorEstado}; font-weight: bold;">${c.estado}</td>
            </tr>
        `;
    });
}

// --- MODAL DE PAGOS ---
function abrirModalPago() { document.getElementById('pagoModal').classList.add('active'); }
function cerrarModal(id) { 
    document.getElementById(id).classList.remove('active'); 
    document.getElementById('pagoForm').reset();
}

async function procesarPago(e) {
    e.preventDefault();
    const tipo = document.getElementById('tipoPago').value;
    const monto = parseFloat(document.getElementById('montoOro').value);
    
    // Decidir el endpoint según lo que seleccionó el usuario
    const endpoint = tipo === 'INSCRIPCION' 
        ? `/brigadas/${brigadaId}/pagos` 
        : `/brigadas/${brigadaId}/arrime/pagos`;

    const payload = { montoOro: monto };
    document.getElementById('btnGuardarPago').disabled = true;

    try {
        const response = await authFetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            cerrarModal('pagoModal');
            alert("Abono procesado con éxito.");
    
            generarComprobantePDF('abono', {
                concepto: tipo === 'INSCRIPCION' ? 'Inscripción' : 'Cuota de Arrime',
                montoOro: monto
            });
            cargarDetallesBrigada(); // Refrescar los datos de la pantalla
        } else {
            const err = await response.json();
            alert(err.message || "Error al procesar el pago.");
        }
    } catch (error) {
        alert("Error de conexión con el servidor.");
    }

    document.getElementById('btnGuardarPago').disabled = false;
}

// Función para generar y descargar el ticket en PDF
function generarComprobantePDF(tipo, datos) {
    // Inicializamos jsPDF. Formato A5 para que parezca un recibo o ticket grande
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", format: "a5" });

    // --- CABECERA CORPORATIVA ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("CVM LOS KM", 74, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Corporación Venezolana de Minería", 74, 26, { align: "center" });
    doc.text("RIF: J508336828", 74, 32, { align: "center" });
    
    doc.setLineWidth(0.5);
    doc.line(10, 36, 138, 36); // Línea separadora

    // --- DATOS DEL COMPROBANTE ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`COMPROBANTE DE ${tipo.toUpperCase()}`, 74, 46, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 60);
    
    // Obtenemos el nombre de la brigada que ya está en el HTML
    const nombreBrigada = document.getElementById('tituloBrigada').innerText;
    doc.text(`Brigada: ${nombreBrigada}`, 10, 68);

    doc.line(10, 74, 138, 74); // Línea separadora

    // --- DETALLES DE LA OPERACIÓN ---
    doc.setFont("helvetica", "bold");
    doc.text("DETALLE DE LA OPERACIÓN", 10, 84);
    
    doc.setFont("helvetica", "normal");
    let yPos = 94;

    if (tipo === 'abono') {
        doc.text(`Concepto: Pago de ${datos.concepto}`, 10, yPos);
        doc.text(`Monto Entregado: ${datos.montoOro} g de Oro`, 10, yPos + 8);
    } else if (tipo === 'despacho') {
        doc.text(`Producto: ${datos.producto}`, 10, yPos);
        doc.text(`Cantidad: ${datos.cantidad}`, 10, yPos + 8);
        doc.text(`Costo Debitado: ${datos.costoOro} g de Oro`, 10, yPos + 16);
    }

    // --- FIRMAS ---
    doc.line(20, 160, 60, 160); // Línea firma 1
    doc.text("Firma Autorizada", 25, 166);

    doc.line(88, 160, 128, 160); // Línea firma 2
    doc.text("Firma Responsable Brigada", 85, 166);

    // --- GUARDAR Y DESCARGAR ---
    const nombreArchivo = `Comprobante_${tipo}_${new Date().getTime()}.pdf`;
    doc.save(nombreArchivo);
}