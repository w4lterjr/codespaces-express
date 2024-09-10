

const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Simulação de banco de dados com um array
let usuarios = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' }
];

// GET: Obtém todos os usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// POST: Cria um novo usuário
app.post('/usuarios', (req, res) => {
    const novoUsuario = req.body;
    novoUsuario.id = usuarios.length + 1;
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

// PUT: Atualiza um usuário existente
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuarioAtualizado = req.body;
    const index = usuarios.findIndex(user => user.id === id);

    if (index !== -1) {
        usuarios[index] = { id, ...usuarioAtualizado };
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// DELETE: Remove um usuário
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(user => user.id === id);

    if (index !== -1) {
        const usuarioRemovido = usuarios.splice(index, 1);
        res.json(usuarioRemovido[0]);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
