<?php include '../includes/header.php'; ?>
<?php include '../includes/sidebar.php'; ?>

<div class="dashboard-grid">
    <div class="stat-card">
        <h3><i class="fas fa-users text-light"></i> Total Brigadas</h3>
        <p id="stat-total-brigadas" class="stat-value">--</p>
    </div>
    
    <div class="stat-card">
        <h3><i class="fas fa-coins text-light"></i> Oro Inscripciones</h3>
        <p id="stat-oro-inscripciones" class="stat-value letter-green">-- g</p>
    </div>
    
    <div class="stat-card">
        <h3><i class="fas fa-exclamation-triangle text-light"></i> Deuda Arrime</h3>
        <p id="stat-oro-deuda" class="stat-value letter-yellow">-- g</p>
    </div>
</div>

<div class="table-container">
    <h3>Atención Requerida: Brigadas Morosas</h3>
    <table class="corporate-table">
        <thead>
            <tr>
                <th>Código QR</th>
                <th>Brigada</th>
                <th>Meses Atraso</th>
                <th>Deuda Total (Oro)</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody id="morososTableBody">
            <tr>
                <td colspan="5" style="text-align: center;">Cargando métricas...</td>
            </tr>
        </tbody>
    </table>
</div>

<?php include '../includes/footer.php'; ?>
<script src="../js/modules/dashboard.js"></script>