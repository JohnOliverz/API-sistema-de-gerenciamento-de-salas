const mongoose = require('mongoose');

const LaboratorioSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  capacidade: Number,
  foto: String,
});

module.exports = mongoose.model('Laboratorio', LaboratorioSchema);
