const temperaturaStore = require('../utils/temperatura'); // arquivo: utils/temperatura.js


// Salvar temperatura recebida via ESP32 (GET com ?temp=)
async function receberTemperatura(req, res) {
  const { temp } = req.query;

  if (!temp) {
    return res.status(400).json({ erro: 'Temperatura não informada.' });
  }

  temperaturaStore.setTemperatura(temp);
  console.log(`🌡️ Temperatura recebida: ${temp}°C`);
  res.status(200).json({ mensagem: `Temperatura ${temp}°C registrada.` });
}

// Retornar temperatura atual registrada
async function obterTemperaturaAtual(req, res) {
  const temp = temperaturaStore.getTemperatura();

  if (!temp) {
    return res.status(404).json({ erro: 'Nenhuma temperatura registrada ainda.' });
  }

  res.status(200).json({ temperatura: temp });
}

module.exports = {
  receberTemperatura,
  obterTemperaturaAtual
};
