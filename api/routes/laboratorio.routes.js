const express = require('express');
const router = express.Router();
const { cadastrarLaboratorio, listarLaboratorios, gerarRelatorio} = require('../controller/laboratorio.controller');

// GET - listar todos
router.get('/', listarLaboratorios);

// POST - cadastrar novo laboratório
router.post('/novo', cadastrarLaboratorio);

// GET - gerar relatório em PDF
router.get('/relatorio', gerarRelatorio);

module.exports = router;
