document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navItems = document.querySelectorAll('.nav-item');
    const userAvatar = document.querySelector('.user-avatar');
    const cards = document.querySelectorAll('.card');
    const activityItems = document.querySelectorAll('.activity-item');
    
       // Ativar item do menu ao clicar
       navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove a classe 'active' de todos os itens
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Adiciona a classe 'active' apenas no item clicado
            this.classList.add('active');
            
            // Navegação
            if (this.textContent.includes('Sair')) {
                // Redireciona para a página de login após 1 segundo
                setTimeout(() => {
                    window.location.href = 'index.html'; // Altere para o caminho correto da sua página de login
                }, 1000);
            } else if (this.textContent.includes('Perfil')) {
                alert('Carregando perfil do aluno...');
                // window.location.href = 'profile.html';
            }
        });
    });
    
    // Efeito hover nos cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Efeito hover nos itens de atividade
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Mostrar informações do usuário ao clicar no avatar
    userAvatar.addEventListener('click', function() {
        alert('Menu do usuário será exibido aqui!\nNome: Kauã Santos\nMatrícula: 20230001');
    });
    
    // Atualizar dados dinamicamente (simulação)
    function updateData() {
        // Simula atualização de dados
        const now = new Date();
        const timeElement = document.createElement('div');
        timeElement.className = 'update-time';
        timeElement.textContent = `Última atualização: ${now.toLocaleTimeString()}`;
        
        // Remove o elemento anterior se existir
        const oldTimeElement = document.querySelector('.update-time');
        if (oldTimeElement) {
            oldTimeElement.remove();
        }
        
        // Adiciona o novo elemento
        document.querySelector('.welcome-banner').appendChild(timeElement);
        
        // Simula mudança nos dados (apenas visual)
        const frequencyBadge = document.querySelector('.badge-danger');
        if (frequencyBadge) {
            const currentPercent = parseInt(frequencyBadge.textContent);
            const newPercent = Math.min(100, currentPercent + 1);
            frequencyBadge.textContent = `${newPercent}%`;
            
            const progressBar = document.querySelector('.progress-bar');
            progressBar.style.width = `${newPercent}%`;
        }
    }
    
    // Atualiza dados a cada 30 segundos
    setInterval(updateData, 30000);
    
    // Mostrar mensagem de boas-vindas personalizada
    const welcomeBanner = document.querySelector('.welcome-banner h1');
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Bom dia';
    } else if (hour < 18) {
        greeting = 'Boa tarde';
    } else {
        greeting = 'Boa noite';
    }
    
    welcomeBanner.textContent = `${greeting}, Kauã!`;
    
    // Adiciona tooltip para as notas
    const gradeCells = document.querySelectorAll('.grades-table td:nth-child(2)');
    gradeCells.forEach(cell => {
        const grade = parseFloat(cell.textContent);
        let message = '';
        
        if (grade >= 7) {
            message = 'Excelente desempenho!';
        } else if (grade >= 5) {
            message = 'Você está na recuperação.';
        } else {
            message = 'Você foi reprovado.';
        }
        
        cell.setAttribute('title', message);
    });
});