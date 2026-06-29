<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar.php'; ?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <h2 style="color: #cbd5e1;">Gestión de Inventario</h2>
    <button class="btn-primary" style="width: auto; padding: 0.8rem 1.5rem;" onclick="abrirModal()">
        <i class="fas fa-plus"></i> Nuevo Producto
    </button>
</div>

<div class="table-container">
    <table class="corporate-table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Unidad</th>
                <th>Precio (Oro)</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="productosTableBody">
            <tr><td colspan="5" style="text-align: center;">Cargando inventario...</td></tr>
        </tbody>
    </table>
</div>

<!-- EL MODAL (Oculto por defecto) -->
<div id="productoModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="cerrarModal()">&times;</span>
        <div class="modal-header">
            <h3 id="modalTitle">Registrar Producto</h3>
        </div>
        
        <form id="productoForm">
            <input type="hidden" id="productoId"> 
            
            <div class="form-group">
                <label for="nombre">Nombre del Producto</label>
                <input type="text" id="nombre" required placeholder="Ej. Combustible Diesel">
            </div>
            
            <div class="form-group">
                <label for="descripcion">Descripción</label>
                <input type="text" id="descripcion" placeholder="Ej. Tambo de 200 Litros">
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <div class="form-group" style="flex: 1;">
                    <label for="unidad">Unidad de Medida</label>
                    <select id="unidad" style="width: 100%; padding: 0.8rem; background: #121820; color: #fff; border: 1px solid #334155; border-radius: 6px;">
                        <option value="LITROS">Litros</option>
                        <option value="GRAMOS">Gramos</option>
                        <option value="UNIDAD">Unidad (Piezas)</option>
                    </select>
                </div>
                
                <div class="form-group" style="flex: 1;">
                    <label for="precioOro">Precio (Gramos de Oro)</label>
                    <input type="number" step="0.01" id="precioOro" required placeholder="0.00">
                </div>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 1rem;" id="btnGuardar">Guardar Producto</button>
        </form>
    </div>
</div>

<?php include '../includes/footer.php'; ?>
<script src="../js/modules/productos.js"></script>