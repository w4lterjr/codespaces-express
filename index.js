const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'usuarios.json');

// Middleware para parsear JSON
app.use(express.json());

// Função para ler dados do arquivo JSON
const lerDados = () => {
    const dados = fs.readFileSync(dataFilePath);
    return JSON.parse(dados);
};

// Função para escrever dados no arquivo JSON
const escreverDados = (dados) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(dados, null, 2));
};

// GET: Obtém todos os usuários
app.get('/', (req, res) => {
    const usuarios = lerDados();
    res.json(usuarios);
});

// POST: Cria um novo usuário
app.post('/', (req, res) => {
    const novoUsuario = req.body;
    const usuarios = lerDados();
    novoUsuario.id = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
    usuarios.push(novoUsuario);
    escreverDados(usuarios);
    res.status(201).json(novoUsuario);
});

// PUT: Atualiza um usuário existente
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioAtualizado = req.body;
    const usuarios = lerDados();
    const index = usuarios.findIndex(user => user.id === id);

    if (index !== -1) {
        usuarios[index] = { id, ...usuarioAtualizado };
        escreverDados(usuarios);
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// DELETE: Remove um usuário
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuarios = lerDados();
    const index = usuarios.findIndex(user => user.id === id);

    if (index !== -1) {
        const usuarioRemovido = usuarios.splice(index, 1);
        escreverDados(usuarios);
        res.json(usuarioRemovido[0]);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

