// script.js
// -------------------- FUNÇÃO DE NAVEGAÇÃO ENTRE TELAS --------------------
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if(screen) screen.classList.add('active');
}

// -------------------- LOGIN SIMPLES (mock) --------------------
function login(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if(user) {
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
        showScreen('home');
        alert(`Bem-vindo(a), ${user.nome}!`);
    } else {
        alert('Email ou senha incorretos.');
    }
}

// -------------------- REGISTRO SIMPLES (mock) --------------------
function register(nome, email, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if(usuarios.find(u => u.email === email)) {
        alert('Email já cadastrado!');
        return;
    }
    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso!');
    showScreen('login');
}

// -------------------- LOGOUT --------------------
function logout() {
    localStorage.removeItem('usuarioLogado');
    showScreen('login');
}

// -------------------- EVENTOS DE FORMULÁRIOS --------------------
document.addEventListener('DOMContentLoaded', () => {
    // Login
    const loginForm = document.getElementById('login-form');
    if(loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const senha = loginForm.querySelector('input[type="password"]').value;
            login(email, senha);
        });
    }

    // Registro
    const registerForm = document.getElementById('register-form');
    if(registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const nome = registerForm.querySelector('input[name="nome"]').value;
            const email = registerForm.querySelector('input[name="email"]').value;
            const senha = registerForm.querySelector('input[name="senha"]').value;
            register(nome, email, senha);
            registerForm.reset();
        });
    }

    // Logout
    const btnLogout = document.getElementById('logout-btn');
    if(btnLogout) {
        btnLogout.addEventListener('click', logout);
    }

    // Inicializa calendário
    if(typeof gerarCalendario === 'function') gerarCalendario();

    // Inicializa Kanban
    if(typeof renderizarKanban === 'function') renderizarKanban();
});