<!-- index.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | CVM Los KM</title>
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <main class="container">
        <div class="content-box">
            <!-- Branding CVM -->
            <h1 class="main-title">
                <span class="letter-green">C</span><span class="letter-green">V</span><span class="letter-yellow">M</span> 
                <span class="text-light">Los KM</span>
            </h1>
            <h2 class="corporate-name">Corporación Venezolana de Minería</h2>
            
            <div class="divider"></div>

            <!-- Caja de Errores -->
            <div class="error-msg" id="errorMessage"></div>

            <!-- Formulario de Login -->
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" id="email" required autocomplete="email">
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" required autocomplete="current-password">
                </div>

                <button type="submit" id="btnSubmit" class="btn-primary">Ingresar</button>
            </form>
        </div>
    </main>

    <!-- Scripts del Motor (No olvides crear estos archivos en su respectiva ruta) -->
    <script src="js/core/api.js"></script>
    <script src="js/auth/login.js"></script>
</body>
</html>