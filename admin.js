// admin.js

// -------------------- LOGIN ADMIN --------------------
const adminLoginForm = document.getElementById('admin-login-form');
if(adminLoginForm){
    adminLoginForm.addEventListener('submit', e=>{
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const senha = e.target.querySelector('input[type="password"]').value;

        // Exemplo simples de autenticação de admin
        if(email === "admin@labmaker.com" && senha === "admin123"){
            alert("Login de administrador bem-sucedido!");
            window.location.href = "admin-dashboard.html"; // Página admin
        } else {
            alert("Email ou senha inválidos.");
        }
    });
}

// -------------------- GERENCIAR AGENDAMENTOS --------------------
function adicionarAgendamento(nome, telefone, qtdPessoas, data){
    const listaAgendamentos = document.getElementById('agendamento-list');
    if(listaAgendamentos){
        const item = document.createElement('li');
        item.textContent = `${data} - ${nome} (${telefone}) - ${qtdPessoas} pessoa(s)`;
        listaAgendamentos.appendChild(item);
    }
}

// -------------------- GERENCIAR SOLICITAÇÕES --------------------
function adicionarSolicitacao(nome, telefone, descricao, status = 'Recebido'){
    const kanbanColumnMap = {
        'Recebido': 'recebido-column',
        'Análise': 'analise-column',
        'Fazendo': 'fazendo-column',
        'Concluído': 'concluido-column'
    };
    const colunaId = kanbanColumnMap[status];
    const coluna = document.getElementById(colunaId);
    if(coluna){
        const card = document.createElement('div');
        card.classList.add('kanban-card');
        card.textContent = `${nome} - ${descricao}`;
        // adicionar classe de cor de status
        switch(status){
            case 'Recebido': card.classList.add('recebido'); break;
            case 'Análise': card.classList.add('analise'); break;
            case 'Fazendo': card.classList.add('fazendo'); break;
            case 'Concluído': card.classList.add('concluido'); break;
        }
        coluna.appendChild(card);
    }
}

// -------------------- MUDAR STATUS DE SOLICITAÇÕES --------------------
function moverSolicitacao(card, novoStatus){
    card.remove(); // Remove da coluna atual
    adicionarSolicitacao(card.textContent.split(' - ')[0], '', card.textContent.split(' - ')[1], novoStatus);
}

// -------------------- EXEMPLO DE INICIALIZAÇÃO --------------------
document.addEventListener('DOMContentLoaded', ()=>{
    // Exemplo: adicionar agendamento automático
    adicionarAgendamento('João Silva', '11999999999', 3, '15/04/2026');

    // Exemplo: adicionar solicitações iniciais
    adicionarSolicitacao('Maria', '11988888888', 'Teste de solicitação', 'Recebido');
});