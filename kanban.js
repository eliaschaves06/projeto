// kanban.js

// -------------------- FUNÇÃO PARA OBTER SOLICITAÇÕES --------------------
function carregarSolicitacoes() {
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
    return solicitacoes;
}

// -------------------- FUNÇÃO PARA SALVAR SOLICITAÇÕES --------------------
function salvarSolicitacoes(solicitacoes) {
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
}

// -------------------- FUNÇÃO PARA RENDERIZAR KANBAN --------------------
function renderizarKanban() {
    const estados = ['recebido', 'analise', 'fazendo', 'concluido'];
    
    estados.forEach(estado => {
        const coluna = document.querySelector(`.kanban-column.${estado}`);
        if(!coluna) return;

        // Remove cards antigos
        coluna.querySelectorAll('.kanban-card').forEach(card => card.remove());

        // Adiciona cards do estado
        const solicitacoes = carregarSolicitacoes().filter(s => s.status === estado);
        solicitacoes.forEach(s => {
            const card = document.createElement('div');
            card.className = `kanban-card ${estado}`;
            card.textContent = s.titulo || `Solicitação ${s.id}`;
            coluna.appendChild(card);
        });
    });
}

// -------------------- FUNÇÃO PARA ADICIONAR NOVA SOLICITAÇÃO --------------------
function adicionarSolicitacao(titulo, descricao) {
    if(!titulo) return;
    const solicitacoes = carregarSolicitacoes();
    const nova = {
        id: solicitacoes.length + 1,
        titulo,
        descricao,
        status: 'recebido'
    };
    solicitacoes.push(nova);
    salvarSolicitacoes(solicitacoes);
    renderizarKanban();
}

// -------------------- FUNÇÃO PARA ATUALIZAR STATUS --------------------
function atualizarStatus(id, novoStatus) {
    const solicitacoes = carregarSolicitacoes();
    const solicitacao = solicitacoes.find(s => s.id === id);
    if(solicitacao){
        solicitacao.status = novoStatus;
        salvarSolicitacoes(solicitacoes);
        renderizarKanban();
    }
}

// -------------------- INICIALIZAÇÃO --------------------
document.addEventListener('DOMContentLoaded', ()=>{
    renderizarKanban();

    // Exemplo: vincular formulário de criação
    const form = document.getElementById('solicitacao-form');
    if(form){
        form.addEventListener('submit', e => {
            e.preventDefault();
            const titulo = form.querySelector('textarea[placeholder="Descrição da solicitação"]').value;
            adicionarSolicitacao(titulo);
            form.reset();
            alert('Solicitação adicionada!');
        });
    }
});