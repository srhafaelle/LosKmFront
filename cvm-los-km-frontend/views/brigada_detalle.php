<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar.php'; ?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <div>
        <a href="brigadas.php" style="color: #94a3b8; text-decoration: none; font-size: 0.9rem;">
            <i class="fas fa-arrow-left"></i> Volver a Brigadas
        </a>
        <h2 style="color: #cbd5e1; margin-top: 10px;" id="tituloBrigada">Cargando Brigada...</h2>
        <p style="color: #64748b;" id="subtituloBrigada">NUR: -----</p>
    </div>
    <button class="btn-primary" style="width: auto; padding: 0.8rem 1.5rem; background-color: #22c55e; color: #121820;" onclick="abrirModalPago()">
        <i class="fas fa-coins"></i> Abonar Oro
    </button>
</div>

<div class="dashboard-grid">
    <div class="stat-card" style="display: flex; align-items: center; gap: 1.5rem;">
        <div style="background: white; padding: 10px; border-radius: 8px;">
            <img id="qrCodeImage" src="" alt="QR Code" style="width: 100px; height: 100px; display: none;">
        </div>
        <div>
            <h3 style="margin-bottom: 5px;">Código QR Oficial</h3>
            <p style="color: #94a3b8; font-size: 0.85rem;">Para credenciales y despachos</p>
        </div>
    </div>
    
    <div class="stat-card">
        <h3><i class="fas fa-check-circle text-light"></i> Estado Inscripción</h3>
        <p id="stat-inscripcion" class="stat-value">-- / 20g</p>
    </div>
    
    <div class="stat-card">
        <h3><i class="fas fa-exclamation-triangle text-light"></i> Deuda Arrime</h3>
        <p id="stat-deuda" class="stat-value letter-yellow">-- g</p>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem;">
    <!-- TABLA DE DESPACHOS -->
    <div class="table-container">
        <h3><i class="fas fa-truck"></i> Historial de Despachos</h3>
        <table class="corporate-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>Costo Oro</th>
                </tr>
            </thead>
            <tbody id="despachosTableBody">
                <tr><td colspan="4" style="text-align: center;">Cargando...</td></tr>
            </tbody>
        </table>
    </div>

    <!-- TABLA DE CUOTAS (ARRIME) -->
    <div class="table-container">
        <h3><i class="fas fa-calendar-alt"></i> Plan de Arrime</h3>
        <table class="corporate-table">
            <thead>
                <tr>
                    <th>Período</th>
                    <th>Exigido</th>
                    <th>Pagado</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody id="cuotasTableBody">
                <tr><td colspan="4" style="text-align: center;">Cargando...</td></tr>
            </tbody>
        </table>
    </div>
</div>

<!-- MODAL: ABONAR ORO -->
<div id="pagoModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="cerrarModal('pagoModal')">&times;</span>
        <div class="modal-header">
            <h3>Registrar Abono en Oro</h3>
        </div>
        <form id="pagoForm">
            <div class="form-group">
                <label for="tipoPago">Destino del Pago</label>
                <select id="tipoPago" required style="width: 100%; padding: 0.8rem; background: #121820; color: #fff; border: 1px solid #334155; border-radius: 6px;">
                    <option value="INSCRIPCION">Pago de Inscripción</option>
                    <option value="ARRIME">Cuota de Arrime</option>
                </select>
            </div>
            <div class="form-group">
                <label for="montoOro">Monto Entregado (Gramos)</label>
                <input type="number" step="0.01" id="montoOro" required placeholder="Ej. 5.50">
            </div>
            <button type="submit" class="btn-primary" style="margin-top: 1rem; background-color: #22c55e; color: #121820;" id="btnGuardarPago">Procesar Abono</button>
        </form>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<?php include '../includes/footer.php'; ?>
<script src="../js/modules/brigada_detalle.js"></script>