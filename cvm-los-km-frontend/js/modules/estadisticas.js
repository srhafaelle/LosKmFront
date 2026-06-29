// Variables globales para destruir los gráficos previos si el usuario presiona "Actualizar"
let chartStock = null;
let chartIngresos = null;

// Configuración global de colores para Chart.js para que combine con el tema oscuro
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = '#2a3441';

document.addEventListener('DOMContentLoaded', () => {
    cargarEstadisticas();
});

async function cargarEstadisticas() {
    try {
        // Obtenemos los productos con sus nuevas métricas
        const response = await authFetch('/productos');
        if (!response) return;

        const productos = await response.json();
        
        if (productos.length === 0) {
            alert("No hay productos registrados para mostrar estadísticas.");
            return;
        }

        procesarKPIs(productos);
        renderizarGraficoStock(productos);
        renderizarGraficoIngresos(productos);

    } catch (error) {
        console.error("Error cargando estadísticas:", error);
    }
}

function procesarKPIs(productos) {
    let valorTotalStock = 0;
    let oroTotalRecaudado = 0;
    let maxVentas = -1;
    let topProducto = "Ninguno";

    productos.forEach(p => {
        // Cuánto oro vale el inventario que tenemos guardado
        valorTotalStock += (p.stockDisponible || 0) * p.precioOro;
        
        // Cuánto oro ha generado este producto históricamente
        oroTotalRecaudado += (p.oroRecaudadoHistorico || 0);

        // Buscar el más vendido
        const ventas = (p.cantidadTotalDespachada || 0);
        if (ventas > maxVentas && ventas > 0) {
            maxVentas = ventas;
            topProducto = p.nombre;
        }
    });

    document.getElementById('kpi-valor-stock').innerText = valorTotalStock.toFixed(2) + " g";
    document.getElementById('kpi-total-oro').innerText = oroTotalRecaudado.toFixed(2) + " g";
    document.getElementById('kpi-top-producto').innerText = topProducto;
}

function renderizarGraficoStock(productos) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    
    // Si ya existe un gráfico, lo destruimos para evitar parpadeos
    if (chartStock) {
        chartStock.destroy();
    }

    const etiquetas = productos.map(p => p.nombre);
    const datosStock = productos.map(p => p.stockDisponible || 0);

    chartStock = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Cantidad en Stock',
                data: datosStock,
                backgroundColor: '#3b82f6', // Azul corporativo
                borderColor: '#2563eb',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function renderizarGraficoIngresos(productos) {
    const ctx = document.getElementById('ingresosChart').getContext('2d');
    
    if (chartIngresos) {
        chartIngresos.destroy();
    }

    // Filtramos solo los productos que han generado dinero
    const productosRentables = productos.filter(p => (p.oroRecaudadoHistorico || 0) > 0);
    
    // Si ningún producto ha generado ventas, mostramos un gráfico vacío amigable
    const etiquetas = productosRentables.length > 0 ? productosRentables.map(p => p.nombre) : ['Sin ventas'];
    const datosIngresos = productosRentables.length > 0 ? productosRentables.map(p => p.oroRecaudadoHistorico) : [1];
    
    // Paleta de colores CVM
    const colores = ['#22c55e', '#eab308', '#3b82f6', '#a855f7', '#ef4444'];

    chartIngresos = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: etiquetas,
            datasets: [{
                data: datosIngresos,
                backgroundColor: productosRentables.length > 0 ? colores : ['#334155'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            cutout: '70%' // Hace el hueco del medio más grande (estilo moderno)
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Por defecto, cargar el día de HOY
    setFiltroRapido('hoy');

    document.getElementById('filtroFechasForm').addEventListener('submit', (e) => {
        e.preventDefault();
        cargarTesoreria();
    });
});

function setFiltroRapido(rango) {
    const hoy = new Date();
    const fechaFin = hoy.toISOString().split('T')[0];
    let fechaInicio = fechaFin;

    if (rango === 'semana') {
        const haceUnaSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + (hoy.getDay() === 0 ? -6 : 1))); // Lunes de esta semana
        fechaInicio = haceUnaSemana.toISOString().split('T')[0];
    } else if (rango === 'mes') {
        const primeroDelMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        fechaInicio = primeroDelMes.toISOString().split('T')[0];
    }

    document.getElementById('fechaInicio').value = fechaInicio;
    document.getElementById('fechaFin').value = fechaFin;
    cargarTesoreria();
}

async function cargarTesoreria() {
    const inicio = document.getElementById('fechaInicio').value;
    const fin = document.getElementById('fechaFin').value;

    try {
        // Asumiendo que tu backend en Spring Boot tiene un endpoint como este:
        // @GetMapping("/estadisticas/tesoreria") que acepta ?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
        const response = await authFetch(`/dashboard/tesoreria?inicio=${inicio}&fin=${fin}`);
        if (!response) return;

        const data = await response.json();

        // data debería ser algo como: { totalVentas: 150, totalInscripciones: 20, totalArrime: 80 }
        
        const ventas = parseFloat(data.totalVentas || 0);
        const inscripciones = parseFloat(data.totalInscripciones || 0);
        const arrime = parseFloat(data.totalArrime || 0);
        const granTotal = ventas + inscripciones + arrime;

        document.getElementById('tesoreria-ventas').innerText = ventas.toFixed(2) + " g";
        document.getElementById('tesoreria-inscripcion').innerText = inscripciones.toFixed(2) + " g";
        document.getElementById('tesoreria-arrime').innerText = arrime.toFixed(2) + " g";
        document.getElementById('tesoreria-total').innerText = granTotal.toFixed(2) + " g";

    } catch (error) {
        console.error("Error consultando tesorería:", error);
    }
}