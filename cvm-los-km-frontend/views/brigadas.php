<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar.php'; ?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <h2 style="color: #cbd5e1;">Gestión de Brigadas</h2>
    <div style="display: flex; gap: 10px;">
        <button class="btn-action" style="background-color: #eab308; color: #121820; font-weight: bold;" onclick="abrirModalMinero()">
            <i class="fas fa-user-plus"></i> Registrar Minero
        </button>
        <button class="btn-primary" style="width: auto; padding: 0.8rem 1.5rem;" onclick="abrirModalBrigada()">
            <i class="fas fa-users"></i> Nueva Brigada
        </button>
    </div>
</div>

<div class="table-container">
    <table class="corporate-table">
        <thead>
            <tr>
                <th>Código QR</th>
                <th>Nombre Brigada</th>
                <th>Oro Pagado</th>
                <th>Deuda Arrime</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="brigadasTableBody">
            <tr><td colspan="5" style="text-align: center;">Cargando brigadas...</td></tr>
        </tbody>
    </table>
</div>

<!-- MODAL: REGISTRAR MINERO -->
<div id="mineroModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="cerrarModal('mineroModal')">&times;</span>
        <div class="modal-header">
            <h3>Registrar Minero</h3>
        </div>
        <form id="mineroForm">
            <div class="form-group">
                <label for="mineroNombres">Nombres</label>
                <input type="text" id="mineroNombres" required>
            </div>
            <div class="form-group">
                <label for="mineroApellidos">Apellidos</label>
                <input type="text" id="mineroApellidos" required>
            </div>
            <div style="display: flex; gap: 1rem;">
                <div class="form-group" style="flex: 1;">
                    <label for="mineroCedula">Cédula</label>
                    <input type="text" id="mineroCedula" required>
                </div>
                <div class="form-group" style="flex: 1;">
                    <label for="mineroCargo">Cargo</label>
                    <input type="text" id="mineroCargo" required placeholder="Ej. Jefe de Cuadrilla">
                </div>
            </div>
            <button type="submit" class="btn-primary" style="margin-top: 1rem;" id="btnGuardarMinero">Guardar Minero</button>
        </form>
    </div>
</div>

<!-- MODAL: NUEVA BRIGADA -->
<div id="brigadaModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="cerrarModal('brigadaModal')">&times;</span>
        <div class="modal-header">
            <h3>Crear Brigada</h3>
        </div>
        <form id="brigadaForm">
            <div class="form-group">
                <label for="nombreBrigada">Nombre de la Brigada</label>
                <input type="text" id="nombreBrigada" required>
            </div>
            <div class="form-group">
                <label for="mineroResponsableId">Minero Responsable</label>
                <select id="mineroResponsableId" required style="width: 100%; padding: 0.8rem; background: #121820; color: #fff; border: 1px solid #334155; border-radius: 6px;">
                    <option value="">Seleccione un minero...</option>
                </select>
            </div>
            <button type="submit" class="btn-primary" style="margin-top: 1rem;" id="btnGuardarBrigada">Crear Brigada</button>
        </form>
    </div>
</div>

<!-- MODAL: PUNTO DE VENTA (DESPACHO) -->
<div id="despachoModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="cerrarModal('despachoModal')">&times;</span>
        <div class="modal-header">
            <h3>Venta de Insumos</h3>
            <p id="despachoBrigadaNombre" style="color: #64748b; font-size: 0.9rem;"></p>
        </div>
        <form id="despachoForm">
            <input type="hidden" id="despachoBrigadaId">
            <div class="form-group">
                <label for="despachoProductoId">Producto a Vender</label>
                <select id="despachoProductoId" required style="width: 100%; padding: 0.8rem; background: #121820; color: #fff; border: 1px solid #334155; border-radius: 6px;">
                    <option value="" data-precio="0">Seleccione un producto...</option>
                </select>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <div class="form-group" style="flex: 1;">
                    <label for="despachoCantidad">Cantidad Solicitada</label>
                    <input type="number" step="0.01" id="despachoCantidad" required placeholder="Ej. 10">
                </div>
            </div>

            <!-- Total a Cobrar en Oro Automático -->
            <div style="background-color: #121820; border: 1px solid #3b82f6; padding: 1rem; border-radius: 6px; text-align: center; margin-bottom: 1.5rem;">
                <span style="color: #94a3b8; font-size: 0.9rem;">Total a Cobrar (Recibir en Caja)</span>
                <div style="font-size: 2rem; font-weight: bold; color: #eab308;" id="totalCobrarOro">0.00 g</div>
            </div>

            <button type="submit" class="btn-primary" style="background-color: #3b82f6;" id="btnGuardarDespacho">Registrar Pago y Emitir Ticket</button>
        </form>
    </div>
</div>

<?php include '../includes/footer.php'; ?>
<script src="../js/modules/brigadas.js"></script>