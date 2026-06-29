</div> 
        </main> 
    </div> 

    <script src="../js/core/api.js"></script>
    <script>
        document.getElementById('btnLogout').addEventListener('click', () => {
            localStorage.removeItem('jwt_token');
            window.location.href = '../index.php';
        });

        document.getElementById('userEmailDisplay').innerText = "Usuario Autorizado";
    </script>
</body>
</html>