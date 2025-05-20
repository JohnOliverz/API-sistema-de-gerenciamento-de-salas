const Laboratorio = require('../models/Laboratorio');
const gerarRelatorioLaboratorios = require('../utils/gerarRelatorioLaboratorios');
const path = require('path');

// Listar todos os laboratórios
async function listarLaboratorios(req, res) {
  try {
    const laboratorios = await Laboratorio.find();
    res.status(200).json(laboratorios);
    
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar laboratórios' });
  }
}

// Cadastrar um novo laboratório
const cadastrarLaboratorio = async (req, res) => {
  const { nome, descricao, capacidade } = req.body;
  const foto = req.file?.path; // URL da imagem vinda do Cloudinary

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
}


// Gerar relatório em PDF
async function gerarRelatorio(req, res) {
  try {
    const laboratorios = await Laboratorio.find();
    const pdfBuffer = await gerarRelatorioLaboratorios(laboratorios);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="relatorio_laboratorios.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao gerar relatório' });
  }
}

module.exports = {
    listarLaboratorios,
    cadastrarLaboratorio,
    gerarRelatorio
};
