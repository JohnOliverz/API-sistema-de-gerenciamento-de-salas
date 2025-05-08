const express = require('express');
const conectarBanco = require('./config/bd');
const rotasLaboratorios = require('./routes/laboratorio.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conectar ao banco
conectarBanco();

// Rotas
app.use('/api/laboratorios', rotasLaboratorios);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
