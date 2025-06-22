const laboratorioController = require('../controller/laboratorio.controller');
const Laboratorio = require('../models/Laboratorio');
const gerarRelatorioLaboratorios = require('../utils/gerarRelatorioLaboratorios');
const socketIO = require('../socket');

jest.mock('../models/Laboratorio');
jest.mock('../utils/gerarRelatorioLaboratorios');
jest.mock('../socket');

describe('Laboratorio Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('listarLaboratorios', () => {
        it('deve retornar todos os laboratórios', async () => {
            const labs = [{ nome: 'Lab 1' }, { nome: 'Lab 2' }];
            Laboratorio.find.mockResolvedValue(labs);

            await laboratorioController.listarLaboratorios(req, res);

            expect(Laboratorio.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(labs);
        });

        it('deve retornar erro ao falhar', async () => {
            Laboratorio.find.mockRejectedValue(new Error('erro'));

            await laboratorioController.listarLaboratorios(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao buscar laboratórios' });
        });
    });

    describe('cadastrarLaboratorio', () => {
        it('deve cadastrar um novo laboratório', async () => {
            req.body = { nome: 'Lab', descricao: 'desc', capacidade: 10 };
            req.file = { path: 'foto.jpg' };
            const saveMock = jest.fn().mockResolvedValue();
            Laboratorio.mockImplementation(() => ({ save: saveMock }));

            await laboratorioController.cadastrarLaboratorio(req, res);

            expect(saveMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ mensagem: 'Laboratório cadastrado com sucesso!' });
        });

        it('deve retornar erro ao cadastrar', async () => {
            req.body = { nome: 'Lab', descricao: 'desc', capacidade: 10 };
            Laboratorio.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('erro'))
            }));

            await laboratorioController.cadastrarLaboratorio(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao cadastrar laboratório.' });
        });
    });

    describe('gerarRelatorio', () => {
        it('deve gerar relatório dos laboratórios', async () => {
            const labs = [{ nome: 'Lab' }];
            Laboratorio.find.mockResolvedValue(labs);
            gerarRelatorioLaboratorios.mockResolvedValue();

            await laboratorioController.gerarRelatorio(req, res);

            expect(Laboratorio.find).toHaveBeenCalled();
            expect(gerarRelatorioLaboratorios).toHaveBeenCalledWith(labs, res);
        });

        it('deve retornar erro ao gerar relatório', async () => {
            Laboratorio.find.mockRejectedValue(new Error('erro'));

            await laboratorioController.gerarRelatorio(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro ao gerar relatório' });
        });
    });

    describe('bloquearLaboratorio', () => {
        it('deve bloquear laboratório e emitir evento', async () => {
            req.params = { lab: 'Lab' };
            const laboratorio = { nome: 'Lab' };
            Laboratorio.findOneAndUpdate.mockResolvedValue(laboratorio);
            const emitMock = jest.fn();
            socketIO.getIO.mockReturnValue({ emit: emitMock });

            await laboratorioController.bloquearLaboratorio(req, res);

            expect(Laboratorio.findOneAndUpdate).toHaveBeenCalledWith(
                { nome: 'Lab' },
                { $set: { bloqueado: true } },
                { new: true }
            );
            expect(emitMock).toHaveBeenCalledWith('BLOQUEADO 🔒', { mensagem: 'Lab foi bloqueado!' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ mensagem: 'Lab bloqueado.' });
        });

        it('deve retornar 404 se laboratório não encontrado', async () => {
            req.params = { lab: 'Lab' };
            Laboratorio.findOneAndUpdate.mockResolvedValue(null);

            await laboratorioController.bloquearLaboratorio(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ erro: 'Laboratório não encontrado.' });
        });

        it('deve retornar erro ao bloquear laboratório', async () => {
            req.params = { lab: 'Lab' };
            Laboratorio.findOneAndUpdate.mockRejectedValue(new Error('erro'));

            await laboratorioController.bloquearLaboratorio(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao bloquear laboratório.' });
        });
    });
});


