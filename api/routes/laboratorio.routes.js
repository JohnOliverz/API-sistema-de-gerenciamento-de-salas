const express = require('express');
const router = express.Router();
const { cadastrarLaboratorio, listarLaboratorios, gerarRelatorio} = require('../controller/laboratorio.controller');
const upload = require('../middlewares/upload');

// GET - listar todos
router.get('/', listarLaboratorios);

// POST - cadastrar novo laboratório
router.post('/novo', upload.single('foto'), cadastrarLaboratorio);

// GET - gerar relatório em PDF
router.get('/relatorio', gerarRelatorio);

module.exports = router;
