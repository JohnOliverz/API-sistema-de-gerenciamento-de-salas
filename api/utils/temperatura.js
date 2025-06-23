let temperaturaAtual = null;

module.exports = {
  setTemperatura: (temp) => temperaturaAtual = temp,
  getTemperatura: () => temperaturaAtual
};
