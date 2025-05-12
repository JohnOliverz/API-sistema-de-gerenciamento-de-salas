const express = require('express');
const conectarBanco = require('./config/bd');
const authRoutes = require('./routes/auth.routes');
const rotasLaboratorios = require('./routes/laboratorio.routes');
const autenticarToken = require('./middlewares/autenticacao');
const permitirSomenteDiasUteis = require('./middlewares/diasUteis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir apenas dias úteis
app.use(permitirSomenteDiasUteis);
app.use(express.json());

// Conectar ao banco
conectarBanco();

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/laboratorios', autenticarToken, rotasLaboratorios);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
