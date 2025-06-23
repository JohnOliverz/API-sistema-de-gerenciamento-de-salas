const express = require('express');
const router = express.Router();
const {
  cadastrarLaboratorio,
  listarLaboratorios,
  gerarRelatorio,
  bloquearLaboratorio,
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

module.exports = router;
