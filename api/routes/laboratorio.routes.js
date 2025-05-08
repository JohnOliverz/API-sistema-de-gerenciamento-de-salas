const express = require('express');
const router = express.Router();
const { listarLaboratorios } = require('../controller/laboratorio.controller');

router.get('/', listarLaboratorios);

module.exports = router;
