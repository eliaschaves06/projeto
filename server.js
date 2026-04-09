// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- MIDDLEWARE --------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// -------------------- BANCO DE DADOS SIMPLIFICADO --------------------
let usuarios = [];
let agendamentos = [];
let solicitacoes = [];

// -------------------- ROTAS --------------------

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Registro
app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;
    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Email já cadastrado!' });
    }
    usuarios.push({ nome, email, senha });
    res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
});

// Login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if (!user) return res.status(400).json({ message: 'Email ou senha incorretos.' });
    res.status(200).json({ message: 'Login realizado com sucesso!', user });
});

// Agendamento
app.post('/agendamento', (req, res) => {
    const { nome, telefone, pessoas, data } = req.body;
    agendamentos.push({ id: agendamentos.length+1, nome, telefone, pessoas, data });
    res.status(200).json({ message: 'Agendamento criado com sucesso!' });
});

// Solicitação
app.post('/solicitacao', (req, res) => {
    const { nome, telefone, descricao, especificacoes } = req.body;
    solicitacoes.push({ 
        id: solicitacoes.length+1, 
        nome, 
        telefone, 
        descricao, 
        especificacoes, 
        status: 'recebido' 
    });
    res.status(200).json({ message: 'Solicitação enviada com sucesso!' });
});

// Obter solicitações (Kanban)
app.get('/solicitacoes', (req, res) => {
    res.json(solicitacoes);
});

// Obter agendamentos
app.get('/agendamentos', (req, res) => {
    res.json(agendamentos);
});

// -------------------- INICIAR SERVIDOR --------------------
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:8080`);
});