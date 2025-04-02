document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    const successMessage = document.getElementById('successMessage');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmError.textContent = '';
        successMessage.textContent = '';
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate email
        if (!validateEmail(email)) {
            emailError.textContent = 'Por favor, insira um e-mail válido.';
            return;
        }
        
        // Validate password
        if (password.length < 6) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            return;
        }
        
        // Validate password match
        if (password !== confirmPassword) {
            confirmError.textContent = 'As senhas não coincidem.';
            return;
        }
        
        // Send data to server
        registerUser(name, email, password);
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function registerUser(name, email, password) {
        // In a real application, you would hash the password before sending
        const userData = {
            name: name,
            email: email,
            password: password
        };
        
        fetch('cadastrar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando...';
                setTimeout(() => {
                    window.location.href = '/portal-aluno/dash/index.html';
                }, 2000);
            } else {
                if (data.error === 'email_exists') {
                    emailError.textContent = 'Este e-mail já está cadastrado.';
                } else {
                    successMessage.textContent = 'Erro no cadastro. Tente novamente.';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            successMessage.textContent = 'Erro na conexão. Tente novamente.';
        });
    }
});