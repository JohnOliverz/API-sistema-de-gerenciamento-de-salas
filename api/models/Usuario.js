const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
