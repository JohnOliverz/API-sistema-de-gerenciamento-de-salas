const express = require('express');
const router = express.Router();
const {
  cadastrarLaboratorio,
  listarLaboratorios,
  gerarRelatorio,
  bloquearLaboratorio,
  obterTemperaturaAtual,
  receberTemperatura
} = require('../controller/laboratorio.controller');

const upload = require('../middlewares/upload');

// GET - listar laboratórios
router.get('/', listarLaboratorios);

// POST - cadastrar laboratório
router.post('/novo', upload.single('foto'), cadastrarLaboratorio);

// GET - gerar relatório PDF
router.get('/relatorio', gerarRelatorio);

// POST - bloquear laboratório
router.post('/bloquear/:lab', bloquearLaboratorio);

// GET - recebe temperatura via query (?temp=25.3)
router.get('/temperatura', receberTemperatura);

// GET - retorna última temperatura
router.get('/temperaturaAtual', obterTemperaturaAtual);

module.exports = router;
