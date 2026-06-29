<aside class="sidebar">
            <div class="sidebar-brand">
                <span class="letter-green">C</span><span class="letter-green">V</span><span class="letter-yellow">M</span>
            </div>
            <nav class="sidebar-nav">
                <a href="dashboard.php" class="nav-link active"><i class="fas fa-chart-line"></i> Dashboard</a>
                <a href="brigadas.php" class="nav-link"><i class="fas fa-users"></i> Brigadas</a>
                <a href="productos.php" class="nav-link"><i class="fas fa-gas-pump"></i> Inventario</a>
                <a href="estadisticas.php" class="nav-link admin-only manager-only" style="display: none;"><i class="fas fa-chart-pie"></i> Estadísticas</a>
                <a href="usuarios.php" class="nav-link admin-only" style="display: none;"><i class="fas fa-user-shield"></i> Usuarios y Roles</a>
            </nav>
            <div class="sidebar-footer">
                <button id="btnLogout" class="btn-logout"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</button>
            </div>
        </aside>

        <main class="main-content">
            <header class="top-header">
                <h2 id="pageTitle" class="text-light">Panel Principal</h2>
                <div class="user-profile">
                    <i class="fas fa-user-circle"></i>
                    <span id="userEmailDisplay">Cargando...</span>
                </div>
            </header>
            
            <div class="content-wrapper">