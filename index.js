const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nome_do_banco', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));
const mongoose = require('mongoose');

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/nome_do_banco', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Definir o esquema e o modelo do Usuário
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  idade: Number
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Função para criar um usuário
const criarUsuario = async () => {
  try {
    const usuario = new Usuario({
      nome: 'João',
      email: 'joao@example.com',
      idade: 30
    });
    const resultado = await usuario.save();
    console.log('Usuário criado:', resultado);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
  }
};

// Função para ler todos os usuários
const lerUsuarios = async () => {
  try {
    const usuarios = await Usuario.find();
    console.log('Usuários encontrados:', usuarios);
  } catch (err) {
    console.error('Erro ao ler usuários:', err);
  }
};

// Função para encontrar um usuário por ID
const encontrarUsuarioPorId = async (id) => {
  try {
    const usuario = await Usuario.findById(id);
    console.log('Usuário encontrado:', usuario);
  } catch (err) {
    console.error('Erro ao encontrar usuário:', err);
  }
};

// Função para atualizar um usuário
const atualizarUsuario = async (id, dadosAtualizados) => {
  try {
    const resultado = await Usuario.findByIdAndUpdate(id, dadosAtualizados, { new: true });
    console.log('Usuário atualizado:', resultado);
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
  }
};

// Função para deletar um usuário
const deletarUsuario = async (id) => {
  try {
    const resultado = await Usuario.findByIdAndDelete(id);
    console.log('Usuário deletado:', resultado);
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
  }
};

// Executar as funções para demonstrar as operações CRUD

// Criação de um usuário
criarUsuario();

// Leitura de todos os usuários
lerUsuarios();

// Substitua 'id_do_usuario' pelo ID real do usuário
const usuarioId = 'id_do_usuario';
encontrarUsuarioPorId(usuarioId);

// Substitua 'id_do_usuario' e os dados a serem atualizados
atualizarUsuario(usuarioId, { idade: 31 });

// Substitua 'id_do_usuario' pelo ID real do usuário
deletarUsuario(usuarioId);
