// calendar.js

// -------------------- FUNÇÃO PARA GERAR CALENDÁRIO --------------------
function gerarCalendario(mesDias = 30, calendarioId = 'calendar-body') {
    const calendarBody = document.getElementById(calendarioId);
    if(!calendarBody) return;

    calendarBody.innerHTML = ''; // limpa calendário
    let dia = 1;

    for(let i=0; i<5; i++){ // até 5 linhas
        const row = document.createElement('tr');
        for(let j=0; j<7; j++){ // 7 dias por semana
            const cell = document.createElement('td');
            if(dia <= mesDias){
                cell.textContent = dia;

                // Aleatório: disponível ou não
                const disponivel = Math.random() > 0.3;
                cell.classList.add(disponivel ? 'available' : 'unavailable');

                // Clique apenas em datas disponíveis
                if(disponivel){
                    cell.addEventListener('click', ()=> {
                        selecionarData(cell);
                    });
                }

                dia++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

// -------------------- FUNÇÃO DE SELEÇÃO DE DATA --------------------
function selecionarData(cell){
    // Remove seleção anterior
    document.querySelectorAll('#calendar-body td.selected').forEach(c => c.classList.remove('selected'));
    
    // Adiciona classe selecionada
    cell.classList.add('selected');

    alert(`Data selecionada: ${cell.textContent}`);
}

// -------------------- FUNÇÃO PARA RESETAR CALENDÁRIO --------------------
function resetarCalendario(calendarioId = 'calendar-body'){
    const calendarBody = document.getElementById(calendarioId);
    if(calendarBody) calendarBody.innerHTML = '';
}

// -------------------- INICIALIZAÇÃO --------------------
document.addEventListener('DOMContentLoaded', ()=>{
    gerarCalendario(); // Gera calendário padrão
});