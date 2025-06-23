const express = require('express');
const router = express.Router();
const {receberTemperatura, obterTemperaturaAtual} = require('../controller/temperatura.controller');
const e = require('express');

// GET - recebe temperatura via query (?temp=25.3)
router.get('/temperatura', receberTemperatura);

// GET - retorna última temperatura
router.get('/temperaturaAtual', obterTemperaturaAtual);

module.exports = router;