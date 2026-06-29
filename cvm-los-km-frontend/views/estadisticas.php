<?php include '../includes/header.php'; ?>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<?php include '../includes/sidebar.php'; ?>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <h2 style="color: #cbd5e1;">Tesorería y Arqueo de Caja</h2>
</div>

<!-- FILTROS DE FECHA -->
<div style="background-color: #1e252e; padding: 1.5rem; border-radius: 8px; border: 1px solid #2a3441; margin-bottom: 2rem;">
    <form id="filtroFechasForm" style="display: flex; gap: 1.5rem; align-items: flex-end;">
        <div class="form-group" style="margin-bottom: 0;">
            <label for="fechaInicio">Desde:</label>
            <input type="date" id="fechaInicio" required style="padding: 0.6rem;">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <label for="fechaFin">Hasta:</label>
            <input type="date" id="fechaFin" required style="padding: 0.6rem;">
        </div>
        <button type="submit" class="btn-primary" style="width: auto; padding: 0.6rem 1.5rem;">
            <i class="fas fa-search"></i> Filtrar
        </button>
        
        <!-- Botones rápidos -->
        <div style="display: flex; gap: 0.5rem; margin-left: auto;">
            <button type="button" class="btn-action" style="background-color: #334155;" onclick="setFiltroRapido('hoy')">Hoy</button>
            <button type="button" class="btn-action" style="background-color: #334155;" onclick="setFiltroRapido('semana')">Esta Semana</button>
            <button type="button" class="btn-action" style="background-color: #334155;" onclick="setFiltroRapido('mes')">Este Mes</button>
        </div>
    </form>
</div>

<!-- KPI DE TESORERÍA -->
<div class="dashboard-grid">
    <div class="stat-card" style="border-top: 4px solid #3b82f6;">
        <h3><i class="fas fa-gas-pump text-light"></i> Recaudado por Ventas (Insumos)</h3>
        <p id="tesoreria-ventas" class="stat-value" style="color: #3b82f6;">0.00 g</p>
    </div>
    <div class="stat-card" style="border-top: 4px solid #22c55e;">
        <h3><i class="fas fa-file-contract text-light"></i> Recaudado por Inscripciones</h3>
        <p id="tesoreria-inscripcion" class="stat-value" style="color: #22c55e;">0.00 g</p>
    </div>
    <div class="stat-card" style="border-top: 4px solid #eab308;">
        <h3><i class="fas fa-balance-scale text-light"></i> Recaudado por Arrime (Cuotas)</h3>
        <p id="tesoreria-arrime" class="stat-value" style="color: #eab308;">0.00 g</p>
    </div>
</div>

<div class="stat-card" style="margin-top: 1.5rem; text-align: center; border: 2px solid #cbd5e1;">
    <h3 style="font-size: 1.2rem;">ORO TOTAL EN BÓVEDA (Período Seleccionado)</h3>
    <p id="tesoreria-total" class="stat-value" style="font-size: 3rem;">0.00 g</p>
</div>

<?php include '../includes/footer.php'; ?>
<script src="../js/modules/estadisticas.js"></script>