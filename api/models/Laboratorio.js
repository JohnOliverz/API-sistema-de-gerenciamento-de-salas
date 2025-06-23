const mongoose = require('mongoose');

const LaboratorioSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  capacidade: Number,
  bloqueado: {
    type: Boolean,
    default: false
  },
  foto: String,
});

module.exports = mongoose.model('Laboratorio', LaboratorioSchema);
