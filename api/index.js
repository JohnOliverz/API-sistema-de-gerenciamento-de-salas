const http = require('http');
const path = require('path');
const express = require('express');
const conectarBanco = require('./config/bd');
const authRoutes = require('./routes/auth.routes');
const temperaturaRoutes = require('./routes/temperatura.routes');
const rotasLaboratorios = require('./routes/laboratorio.routes');
const mensagemHome = require('./utils/mensagemHome'); 
const permitirSomenteDiasUteis = require('./middlewares/diasUteis');
const socketIO = require('./socket');

require('dotenv').config();

const app = express();
const server = http.createServer(app); // necessário para o socket

socketIO.init(server); // inicia socket.io com esse server

// Servir arquivos HTML/CSS/JS estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir documentação Swagger
app.use('/docs', express.static(path.join(__dirname, '..')));

// Página inicial
app.get('/', (req, res) => {
  res.send(mensagemHome);
});

// Middleware para permitir apenas dias úteis
app.use(permitirSomenteDiasUteis);
app.use(express.json());

conectarBanco();

app.use('/api/auth', authRoutes);
app.use('/api/laboratorios', rotasLaboratorios);
app.use('/api', temperaturaRoutes);

// Verifica se está rodando localmente ou em ambiente de produção
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
} else {
  // Exporta o app para o Vercel
  module.exports = app;
}
