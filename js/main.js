document.addEventListener('DOMContentLoaded', function() {
    // Toggle Sidebar
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    function toggleSidebar() {
        body.classList.toggle('sidebar-collapsed');
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }

    // User Menu Dropdown
    const userMenuToggle = document.querySelector('.user-menu-toggle');
    const userMenu = document.querySelector('.user-menu');

    if (userMenuToggle && userMenu) {
        userMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (!userMenu.contains(e.target)) {
                userMenu.classList.remove('active');
            }
        });
    }

    // Notificações e Mensagens
    const notificationButtons = document.querySelectorAll('.btn-icon');
    
    notificationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aqui você pode adicionar a lógica para mostrar as notificações/mensagens
            console.log('Notificação/Mensagem clicada');
        });
    });

    // Pesquisa
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            // Aqui você pode adicionar a lógica de pesquisa
            console.log('Pesquisando:', e.target.value);
        });
    }

    // Responsividade
    function handleResponsive() {
        if (window.innerWidth <= 768) {
            body.classList.add('sidebar-collapsed');
        } else {
            body.classList.remove('sidebar-collapsed');
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive(); // Executa na carga inicial

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar senhas iguais
            const passwordInputs = this.querySelectorAll('input[type="password"]');
            if (passwordInputs.length === 2) {
                const [password, confirmPassword] = passwordInputs;
                if (password.value !== confirmPassword.value) {
                    alert('As senhas não coincidem!');
                    return;
                }
            }
            
            // Simular envio do formulário
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Redirecionar após sucesso
                if (this.classList.contains('login-form')) {
                    window.location.href = 'dashboard.html';
                } else if (this.classList.contains('cadastro-form')) {
                    window.location.href = 'login.html';
                }
            }, 1500);
        });
    });

    // Input masks

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                submitBtn.textContent = 'Mensagem Enviada!';
                submitBtn.classList.add('btn-success');
                
                this.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('btn-success');
                }, 3000);
            }, 1500);
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Função para mostrar/ocultar senha
    function togglePassword(inputId, buttonId) {
        const input = document.getElementById(inputId);
        const button = document.getElementById(buttonId);
        
        button.addEventListener('click', () => {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Troca o ícone
            const icon = button.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Inicializa os botões de mostrar/ocultar senha
    document.addEventListener('DOMContentLoaded', () => {
        togglePassword('senha', 'toggle-senha');
        togglePassword('confirmar-senha', 'toggle-confirmar-senha');
        
        // Máscara para telefone
        const telefone = document.getElementById('telefone');
        telefone.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
        
        // Validação de senha
        const senha = document.getElementById('senha');
        const confirmarSenha = document.getElementById('confirmar-senha');
        
        confirmarSenha.addEventListener('input', () => {
            if (senha.value !== confirmarSenha.value) {
                confirmarSenha.setCustomValidity('As senhas não coincidem');
            } else {
                confirmarSenha.setCustomValidity('');
            }
        });
        
        // Validação do formulário
        const form = document.querySelector('.cadastro-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (form.checkValidity()) {
                // Aqui você pode adicionar o código para enviar os dados para o servidor
                console.log('Formulário válido, enviando dados...');
            }
        });
    });
}); 