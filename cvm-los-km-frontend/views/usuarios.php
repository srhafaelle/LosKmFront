<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar.php'; ?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <h2 style="color: #cbd5e1;">Control de Personal y Accesos</h2>
    <button class="btn-primary" style="width: auto; padding: 0.8rem 1.5rem;" onclick="abrirModalUsuario()">
        <i class="fas fa-user-plus"></i> Nuevo Usuario
    </button>
</div>

<div class="table-container">
    <table class="corporate-table">
        <thead>
            <tr>
                <th>Correo Electrónico</th>
                <th>Rol Asignado</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="usuariosTableBody">
            <tr><td colspan="4" style="text-align: center;">Cargando usuarios...</td></tr>
        </tbody>
    </table>
</div>

<!-- MODAL: REGISTRAR/EDITAR USUARIO -->
<div id="usuarioModal" class="modal">
    <div class="modal-content">
        <span class="close-btn" onclick="cerrarModal('usuarioModal')">&times;</span>
        <div class="modal-header">
            <h3 id="modalUsuarioTitle">Registrar Nuevo Usuario</h3>
        </div>
        
        <form id="usuarioForm">
            <input type="hidden" id="usuarioId">
            
            <div class="form-group">
                <label for="userEmail">Correo Electrónico (Usuario)</label>
                <input type="email" id="userEmail" required placeholder="operador@cvm.com">
            </div>
            
            <div class="form-group">
                <label for="userPassword">Contraseña <span id="passHelp" style="font-weight: normal; font-size: 0.8rem; color: #64748b;">(Obligatoria)</span></label>
                <input type="password" id="userPassword" placeholder="••••••••">
            </div>
            
            <div class="form-group">
                <label for="userRole">Nivel de Acceso (Rol)</label>
                <select id="userRole" required style="width: 100%; padding: 0.8rem; background: #121820; color: #fff; border: 1px solid #334155; border-radius: 6px;">
                    <option value="ROLE_USER">Operador Básico (Solo Despachos)</option>
                    <option value="ROLE_MANAGER">Gerente (Reportes y Despachos)</option>
                    <option value="ROLE_ADMIN">Administrador (Acceso Total)</option>
                </select>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 1rem;" id="btnGuardarUsuario">Guardar Usuario</button>
        </form>
    </div>
</div>

<?php include '../includes/footer.php'; ?>
<script src="../js/modules/usuarios.js"></script>