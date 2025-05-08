const Laboratorio = require('../models/Laboratorio');

async function listarLaboratorios(req, res) {
  try {
    const laboratorios = await Laboratorio.find();
    res.status(200).json(laboratorios);
    
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar laboratórios' });
  }
}

module.exports = {
  listarLaboratorios
};
