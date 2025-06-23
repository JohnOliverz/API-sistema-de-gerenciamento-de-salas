const Laboratorio = require('../models/Laboratorio');
const gerarRelatorioLaboratorios = require('../utils/gerarRelatorioLaboratorios');
const socketIO = require('../socket');

// Listar todos os laboratórios
async function listarLaboratorios(req, res) {
  try {
    const laboratorios = await Laboratorio.find();
    res.status(200).json(laboratorios);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar laboratórios' });
  }
}

// Cadastrar novo laboratório
const cadastrarLaboratorio = async (req, res) => {
  const { nome, descricao, capacidade } = req.body;
  const foto = req.file?.path;

  try {
    const novoLaboratorio = new Laboratorio({
      nome,
      descricao,
      capacidade,
      foto
    });

    await novoLaboratorio.save();
    res.status(201).json({ mensagem: 'Laboratório cadastrado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar laboratório.' });
  }
};

// Gerar relatório PDF
async function gerarRelatorio(req, res) {
  try {
    const laboratorios = await Laboratorio.find();
    await gerarRelatorioLaboratorios(laboratorios, res);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao gerar relatório' });
  }
}

// Bloquear laboratório com Socket.IO
async function bloquearLaboratorio(req, res) {
  const lab = req.params.lab;

  try {
    const laboratorio = await Laboratorio.findOneAndUpdate(
      { nome: lab },
      { $set: { bloqueado: true } },
      { new: true }
    );

    if (!laboratorio) {
      return res.status(404).json({ erro: 'Laboratório não encontrado.' });
    }

    const canal = `BLOQUEADO 🔒`;
    socketIO.getIO().emit(canal, { mensagem: `${lab} foi bloqueado!` });

    res.status(200).json({ mensagem: `${lab} bloqueado.` });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao bloquear laboratório.' });
  }
}

module.exports = {
  listarLaboratorios,
  cadastrarLaboratorio,
  gerarRelatorio,
  bloquearLaboratorio
};
