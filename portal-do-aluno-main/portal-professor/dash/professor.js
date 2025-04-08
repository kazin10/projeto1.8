document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const navItems = document.querySelectorAll('.nav-item');
    const userAvatar = document.querySelector('.user-avatar');
    const gradeForm = document.getElementById('grade-form');
    const attendanceForm = document.getElementById('attendance-form');
    const activityForm = document.getElementById('activity-form');
    const observationForm = document.getElementById('observation-form');

    // Navegação no menu
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            if (this.textContent.includes('Sair')) {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Filtragem de Alunos
        document.querySelectorAll('.filtros button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filtros .ativo').classList.remove('ativo');
                btn.classList.add('ativo');
            });
        });
    
        // Adicionar Observação
        document.querySelector('.nova-observacao button').addEventListener('click', () => {
            const input = document.querySelector('.nova-observacao input');
            if(input.value) {
                const novoItem = document.createElement('p');
                novoItem.innerHTML = `<strong>${new Date().toLocaleDateString()}:</strong> ${input.value}`;
                document.querySelector('.historico-observacoes').prepend(novoItem);
                input.value = '';
            }
        });
    });

    // Adicionar nota
    gradeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const student = document.getElementById('student').value;
        const subject = document.getElementById('subject').value;
        const grade = document.getElementById('grade').value;
        
        if (!student || !subject || !grade) {
            alert('Preencha todos os campos!');
            return;
        }
        
        // Aqui você enviaria os dados para o servidor
        console.log(`Nota adicionada: Aluno ${student}, Disciplina ${subject}, Nota ${grade}`);
        alert('Nota adicionada com sucesso!');
        gradeForm.reset();
    });

    // Registrar frequência
    attendanceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('attendance-date').value;
        const subject = document.getElementById('attendance-subject').value;
        const attendances = document.querySelectorAll('.attendance-list input[type="checkbox"]');
        
        if (!date || !subject) {
            alert('Preencha todos os campos!');
            return;
        }
        
        // Processar presenças
        attendances.forEach(attendance => {
            console.log(`Aluno ${attendance.parentNode.previousElementSibling.textContent}: ${attendance.checked ? 'Presente' : 'Faltou'}`);
        });
        
        alert('Frequência registrada com sucesso!');
        attendanceForm.reset();
    });

    // Adicionar atividade
    activityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('activity-title').value;
        const subject = document.getElementById('activity-subject').value;
        const dueDate = document.getElementById('activity-due').value;
        const description = document.getElementById('activity-desc').value;
        
        if (!title || !subject || !dueDate) {
            alert('Preencha os campos obrigatórios!');
            return;
        }
        
        console.log(`Atividade adicionada: ${title}, Disciplina ${subject}, Entrega ${dueDate}`);
        alert('Atividade adicionada com sucesso!');
        activityForm.reset();
    });

    // Adicionar observação
    observationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const student = document.getElementById('observation-student').value;
        const text = document.getElementById('observation-text').value;
        
        if (!student || !text) {
            alert('Preencha todos os campos!');
            return;
        }
        
        console.log(`Observação para aluno ${student}: ${text}`);
        alert('Observação adicionada com sucesso!');
        observationForm.reset();
    });

    // Efeitos visuais
    userAvatar.addEventListener('click', function() {
        alert('Menu do professor será exibido aqui!');
    });

    // Mensagem de boas-vindas personalizada
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) greeting = 'Bom dia';
    else if (hour < 18) greeting = 'Boa tarde';
    else greeting = 'Boa noite';
    
    document.querySelector('.welcome-banner h1').textContent = `${greeting}, Professora Debora!`;
});