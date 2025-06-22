const express = require('express');
const { cadastrarUsuario, logarUsuario, enviarVideoTutorial, videoTutorial} = require('../controller/auth.controller');
const { get } = require('mongoose');

const router = express.Router();

// POST - cadastrar novo usuário
router.post('/cadastrar', cadastrarUsuario);

// POST - logar usuário
router.post('/logar', logarUsuario);

// GET - Video tutorial
router.get('/tutorial', videoTutorial);

module.exports = router;
