const request = require('supertest');
const app = require('../../../app'); 
const Usuario = require('../../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock completo dos módulos
jest.mock('../../models/Usuario', () => {
  return jest.fn().mockImplementation(function (data) {
    return {
      ...data,
      save: jest.fn().mockResolvedValue(data),
    };
  });
});

const usuarioMock = {
  findOne: jest.fn(),
};

Usuario.findOne = usuarioMock.findOne;
Usuario.create = jest.fn();

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock_token')
}));

// Mock do middleware de autenticação
jest.mock('../../../api/middlewares/autenticacao', () => 
  jest.fn((req, res, next) => next())
);

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Configuração padrão para bcrypt.compare
    bcrypt.compare.mockResolvedValue(true);
  });

  describe('POST /api/auth/cadastrar', () => {
    it('deve retornar 201 ao cadastrar novo usuário', async () => {
      Usuario.findOne.mockResolvedValue(null);
      
      const response = await request(app)
        .post('/api/auth/cadastrar')
        .send({
          nome: 'Teste',
          email: 'teste@teste.com',
          senha: '123456'
        });

      expect(response.status).toBe(201);
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    });

    it('deve retornar 400 quando email já existe', async () => {
      Usuario.findOne.mockResolvedValue({ email: 'existente@teste.com' });

      const response = await request(app)
        .post('/api/auth/cadastrar')
        .send({
          nome: 'Teste',
          email: 'existente@teste.com',
          senha: '123456'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/logar', () => {
    it('deve retornar 200 e token para credenciais válidas', async () => {
      Usuario.findOne.mockResolvedValue({
        _id: '123',
        email: 'teste@teste.com',
        senha: 'hashed_password'
      });

      const response = await request(app)
        .post('/api/auth/logar')
        .send({
          email: 'teste@teste.com',
          senha: '123456'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('deve retornar 401 para usuário não encontrado', async () => {
      Usuario.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/logar')
        .send({
          email: 'inexistente@teste.com',
          senha: '123456'
        });

      expect(response.status).toBe(401);
    });

    it('deve retornar 401 para senha inválida', async () => {
      Usuario.findOne.mockResolvedValue({
        _id: '123',
        email: 'teste@teste.com',
        senha: 'hashed_password'
      });
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post('/api/auth/logar')
        .send({
          email: 'teste@teste.com',
          senha: 'senha_errada'
        });

      expect(response.status).toBe(401);
    });
  });
});