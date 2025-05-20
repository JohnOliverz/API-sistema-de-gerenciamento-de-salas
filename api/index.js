const express = require('express');
const conectarBanco = require('./config/bd');
const authRoutes = require('./routes/auth.routes');
const rotasLaboratorios = require('./routes/laboratorio.routes');
const autenticarToken = require('./middlewares/autenticacao');
const permitirSomenteDiasUteis = require('./middlewares/diasUteis');
require('dotenv').config();

const app = express();

// Middleware para permitir apenas dias úteis
app.use(permitirSomenteDiasUteis);
app.use(express.json());

// Conectar ao banco
conectarBanco();

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/laboratorios', autenticarToken, rotasLaboratorios);


module.exports = app;
