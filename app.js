// app.js

// -------------------- NAVEGAÇÃO DE TELAS --------------------
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// -------------------- CALENDÁRIO DE AGENDAMENTOS --------------------
function gerarCalendario(mesDias = 30) {
    const calendarBody = document.getElementById('calendar-body');
    if(!calendarBody) return;

    calendarBody.innerHTML = ''; // limpa calendário
    let dia = 1;

    for(let i=0; i<5; i++){
        const row = document.createElement('tr');
        for(let j=0; j<7; j++){
            const cell = document.createElement('td');
            if(dia <= mesDias){
                cell.textContent = dia;
                cell.classList.add(Math.random() > 0.3 ? 'available' : 'unavailable');
                dia++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }

    // Clique em datas disponíveis
    calendarBody.addEventListener('click', e => {
        if(e.target.classList.contains('available')){
            alert(`Data selecionada: ${e.target.textContent}`);
        }
    });
}

// -------------------- FORMULÁRIOS --------------------
function initForms() {
    // Agendamento
    const agendamentoForm = document.getElementById('agendamento-form');
    if(agendamentoForm){
        agendamentoForm.addEventListener('submit', e=>{
            e.preventDefault();
            const nome = e.target.querySelector('input[type="text"]').value;
            const telefone = e.target.querySelector('input[type="tel"]').value;
            const qtd = e.target.querySelector('input[type="number"]').value;

            alert(`Agendamento solicitado!\nNome: ${nome}\nTelefone: ${telefone}\nPessoas: ${qtd}`);
            e.target.reset();
        });
    }

    // Solicitação
    const solicitacaoForm = document.getElementById('solicitacao-form');
    if(solicitacaoForm){
        solicitacaoForm.addEventListener('submit', e=>{
            e.preventDefault();
            const nome = e.target.querySelector('input[type="text"]').value;
            const telefone = e.target.querySelector('input[type="tel"]').value;
            const descricao = e.target.querySelector('textarea').value;

            alert(`Solicitação enviada!\nNome: ${nome}\nTelefone: ${telefone}\nDescrição: ${descricao}`);
            e.target.reset();
        });
    }
}

// -------------------- INICIALIZAÇÃO --------------------
document.addEventListener('DOMContentLoaded', ()=>{
    gerarCalendario(); // Gera calendário ao carregar
    initForms();       // Inicializa formulários
});