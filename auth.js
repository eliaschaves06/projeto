// auth.js

// -------------------- FUNÇÕES AUXILIARES --------------------
function salvarUsuario(usuario){
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function validarLogin(email, senha){
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.find(u => u.email === email && u.senha === senha);
}

// -------------------- REGISTRO DE USUÁRIO --------------------
const registerForm = document.getElementById('register-form');
if(registerForm){
    registerForm.addEventListener('submit', e=>{
        e.preventDefault();
        const nome = e.target.querySelector('input[name="nome"]').value;
        const email = e.target.querySelector('input[name="email"]').value;
        const senha = e.target.querySelector('input[name="senha"]').value;

        // Validação simples
        if(!nome || !email || !senha){
            alert('Preencha todos os campos.');
            return;
        }

        salvarUsuario({nome, email, senha});
        alert('Cadastro realizado com sucesso!');
        registerForm.reset();
        // Redirecionar para login
        window.location.href = 'login.html';
    });
}

// -------------------- LOGIN DE USUÁRIO --------------------
const loginForm = document.getElementById('login-form');
if(loginForm){
    loginForm.addEventListener('submit', e=>{
        e.preventDefault();
        const email = e.target.querySelector('input[name="email"]').value;
        const senha = e.target.querySelector('input[name="senha"]').value;

        const usuario = validarLogin(email, senha);
        if(usuario){
            alert(`Bem-vindo(a), ${usuario.nome}!`);
            localStorage.setItem('usuarioAtivo', JSON.stringify(usuario));
            window.location.href = 'index.html'; // Página principal do usuário
        } else {
            alert('Email ou senha inválidos.');
        }
    });
}

// -------------------- LOGOUT --------------------
function logout(){
    localStorage.removeItem('usuarioAtivo');
    window.location.href = 'login.html';
}

// -------------------- VERIFICAR SE USUÁRIO ESTÁ LOGADO --------------------
function checarLogin(){
    const usuario = JSON.parse(localStorage.getItem('usuarioAtivo'));
    if(!usuario){
        window.location.href = 'login.html';
    }
}

// -------------------- INICIALIZAÇÃO --------------------
document.addEventListener('DOMContentLoaded', ()=>{
    // Se houver elementos de logout, adiciona funcionalidade
    const logoutBtn = document.getElementById('logout-btn');
    if(logoutBtn){
        logoutBtn.addEventListener('click', logout);
    }
});