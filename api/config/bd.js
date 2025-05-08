const mongoose = require('mongoose');
require('dotenv').config();

async function conectarBanco() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado ao MongoDB Atlas com sucesso!");
    
  } catch (erro) {
    console.error("❌ Erro ao conectar ao MongoDB:", erro.message);
  }
}

module.exports = conectarBanco;
