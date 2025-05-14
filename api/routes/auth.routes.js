const express = require('express');
const { cadastrarUsuario, logarUsuario } = require('../controller/auth.controller');

const router = express.Router();

// POST - cadastrar novo usuário
router.post('/cadastrar', cadastrarUsuario);

// POST - logar usuário
router.post('/logar', logarUsuario);

module.exports = router;
