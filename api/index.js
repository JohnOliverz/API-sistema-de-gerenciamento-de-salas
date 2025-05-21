const express = require('express');
const conectarBanco = require('./config/bd');
const authRoutes = require('./routes/auth.routes');
const rotasLaboratorios = require('./routes/laboratorio.routes');
const autenticarToken = require('./middlewares/autenticacao');
const permitirSomenteDiasUteis = require('./middlewares/diasUteis');
const mensagemHome = require('./utils/mensagemHome'); 
require('dotenv').config();

const app = express();

// Pagina inicial
app.get('/', (req, res) => {
  res.send(mensagemHome);
});

// Middleware para permitir apenas dias úteis
app.use(permitirSomenteDiasUteis);
app.use(express.json());

// Conectar ao banco
conectarBanco();

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/laboratorios', autenticarToken, rotasLaboratorios);


module.exports = app;
