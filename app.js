//Teve que ser criado o app.js para isolar da aplicação do DB
const express = require('express');
const app = express();

// Configuração do Express
app.use(express.json());

// Rotas
const authRoutes = require('./api/routes/auth.routes');
const labRoutes = require('./api/routes/laboratorio.routes');
const authMiddleware = require('./api/middlewares/autenticacao');

app.use('/api/auth', authRoutes);
app.use('/api/laboratorios', authMiddleware, labRoutes);

// Exporta o app sem iniciar o servidor
module.exports = app;

// Inicia o servidor apenas quando executado diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const conectarBanco = require('./api/config/bd');
  
  conectarBanco().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor de testes`);  
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  });
}