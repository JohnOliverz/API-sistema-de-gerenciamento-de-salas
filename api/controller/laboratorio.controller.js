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
async function cadastrarLaboratorio(req, res) {
  try {
    const { nome, descricao, capacidade, foto } = req.body;

    const novoLaboratorio = new Laboratorio({
      nome,
      descricao,
      capacidade,
      foto,
    });

    const laboratorioSalvo = await novoLaboratorio.save();
    res.status(201).json(laboratorioSalvo);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar laboratório' });
  }
}

// Gerar relatório em PDF
async function gerarRelatorio(req, res) {
  try {
    const laboratorios = await Laboratorio.find();
    const outputPath = path.join(__dirname, '..', 'relatorio_laboratorios.pdf');

    await gerarRelatorioLaboratorios(laboratorios, outputPath);

    res.download(outputPath, 'relatorio_laboratorios.pdf', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao baixar o PDF.');
      }
    });
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
