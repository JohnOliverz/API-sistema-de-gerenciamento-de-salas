function permitirSomenteDiasUteis(req, res, next) {
  const hoje = new Date();
  const diaSemana = hoje.getDay(); // 0 = Domingo, 6 = Sábado

  if (diaSemana === 2 || diaSemana === 6) {
    return res.status(403).json({ mensagem: 'Acesso permitido apenas de segunda à sexta-feira.' });
  }

  next(); // continua para a próxima função/middleware/rota
}

module.exports = permitirSomenteDiasUteis;