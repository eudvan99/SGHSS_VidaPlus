document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('input[type="password"]');

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = passwordInput.value;
        const remember = loginForm.querySelector('input[type="checkbox"]').checked;

        // Disable submit button and show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';

        try {
            // Simulação de chamada à API
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Aqui você implementaria a chamada real à API
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ email, password, remember })
            // });

            // if (!response.ok) {
            //     throw new Error('Credenciais inválidas');
            // }

            // const data = await response.json();

            // Simulação de resposta bem-sucedida
            const data = {
                token: 'simulated_token',
                user: {
                    id: 1,
                    name: 'Usuário Teste',
                    email: email,
                    role: 'admin'
                }
            };

            // Salvar token e dados do usuário
            if (remember) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('user', JSON.stringify(data.user));
            }

            // Redirecionar para o dashboard
            window.location.href = 'dashboard.html';

        } catch (error) {
            // Mostrar mensagem de erro
            showError('E-mail ou senha inválidos. Por favor, tente novamente.');
            
            // Restaurar botão
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });

    // Função para mostrar mensagens de erro
    function showError(message) {
        // Remover mensagem de erro anterior, se existir
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Criar e mostrar nova mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        `;

        loginForm.insertBefore(errorDiv, loginForm.firstChild);

        // Adicionar animação de fade-in
        setTimeout(() => {
            errorDiv.style.opacity = '1';
        }, 10);

        // Remover mensagem após 5 segundos
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            setTimeout(() => {
                errorDiv.remove();
            }, 300);
        }, 5000);
    }

    // Adicionar estilos para mensagem de erro
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            background-color: #FEE2E2;
            color: #DC2626;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .error-message i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
}); 