// Silencia os logs durante os testes
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

// Configuração do timezone para testes (opcional)
process.env.TZ = 'UTC';