// Toggle Sidebar
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Gráfico de Consultas
const ctx = document.getElementById('consultasChart').getContext('2d');

const consultasChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Consultas',
            data: [12, 19, 15, 17, 22, 8, 5],
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    drawBorder: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});

// Notificações
const notificationBtn = document.querySelector('.btn-icon[title="Notificações"]');
const messageBtn = document.querySelector('.btn-icon[title="Mensagens"]');

// Simulação de notificações
let notifications = [
    {
        title: 'Nova Consulta',
        message: 'Maria Oliveira agendou uma consulta para amanhã às 10:00',
        time: '5 min atrás'
    },
    {
        title: 'Exame Pendente',
        message: 'José Santos tem um exame pendente de resultado',
        time: '1 hora atrás'
    },
    {
        title: 'Lembrete',
        message: 'Você tem 3 consultas agendadas para hoje',
        time: '2 horas atrás'
    }
];

// Simulação de mensagens
let messages = [
    {
        sender: 'Dr. Carlos Silva',
        message: 'Olá, podemos discutir o caso do paciente João?',
        time: '10 min atrás'
    },
    {
        sender: 'Dra. Ana Santos',
        message: 'Enviei os resultados do exame para sua análise',
        time: '30 min atrás'
    },
    {
        sender: 'Secretaria',
        message: 'Confirmação de agenda para próxima semana',
        time: '1 hora atrás'
    }
];

// Criar dropdown de notificações
function createNotificationDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu';
    dropdown.style.display = 'none';

    notifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.innerHTML = `
            <div class="dropdown-item-header">
                <h4>${notification.title}</h4>
                <span>${notification.time}</span>
            </div>
            <p>${notification.message}</p>
        `;
        dropdown.appendChild(item);
    });

    notificationBtn.parentNode.appendChild(dropdown);

    notificationBtn.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
}

// Criar dropdown de mensagens
function createMessageDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu';
    dropdown.style.display = 'none';

    messages.forEach(message => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.innerHTML = `
            <div class="dropdown-item-header">
                <h4>${message.sender}</h4>
                <span>${message.time}</span>
            </div>
            <p>${message.message}</p>
        `;
        dropdown.appendChild(item);
    });

    messageBtn.parentNode.appendChild(dropdown);

    messageBtn.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
}

// Inicializar dropdowns
createNotificationDropdown();
createMessageDropdown();

// Fechar dropdowns ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.btn-icon')) {
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});

// Menu do usuário
const userMenu = document.querySelector('.user-menu');

function createUserDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu';
    dropdown.style.display = 'none';
    dropdown.innerHTML = `
        <div class="dropdown-item">
            <i class="fas fa-user"></i>
            <span>Meu Perfil</span>
        </div>
        <div class="dropdown-item">
            <i class="fas fa-cog"></i>
            <span>Configurações</span>
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item">
            <i class="fas fa-sign-out-alt"></i>
            <span>Sair</span>
        </div>
    `;

    userMenu.parentNode.appendChild(dropdown);

    userMenu.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
}

createUserDropdown();

// Adicionar estilos CSS para os dropdowns
const style = document.createElement('style');
style.textContent = `
    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        min-width: 300px;
        z-index: 1000;
        margin-top: 0.5rem;
    }

    .dropdown-item {
        padding: 1rem;
        border-bottom: 1px solid var(--light-gray);
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .dropdown-item:last-child {
        border-bottom: none;
    }

    .dropdown-item:hover {
        background-color: var(--light-gray);
    }

    .dropdown-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .dropdown-item-header h4 {
        font-size: 0.9rem;
        color: var(--primary-color);
        margin: 0;
    }

    .dropdown-item-header span {
        font-size: 0.8rem;
        color: var(--dark-gray);
    }

    .dropdown-item p {
        font-size: 0.9rem;
        color: var(--dark-gray);
        margin: 0;
    }

    .dropdown-divider {
        height: 1px;
        background-color: var(--light-gray);
        margin: 0.5rem 0;
    }

    .dropdown-item i {
        margin-right: 0.5rem;
        color: var(--primary-color);
    }
`;

document.head.appendChild(style); 