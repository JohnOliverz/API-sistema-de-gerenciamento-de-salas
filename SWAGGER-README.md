# Documentação da API de Gerenciamento de Salas

Este projeto inclui uma documentação completa da API usando o formato Swagger/OpenAPI.

## Como visualizar a documentação

Existem duas maneiras de visualizar a documentação da API:

### 1. Usando o arquivo HTML local

1. Abra o arquivo `swagger-ui.html` em seu navegador
2. A interface do Swagger UI será carregada, mostrando todas as rotas disponíveis

### 2. Usando o Swagger Editor online

1. Acesse [https://editor.swagger.io/](https://editor.swagger.io/)
2. Copie o conteúdo do arquivo `swagger.json`
3. Cole no editor online

## Estrutura da API

A API está organizada nas seguintes seções:

### Autenticação
- **POST /api/auth/cadastrar**: Cadastra um novo usuário
- **POST /api/auth/logar**: Autentica um usuário e retorna um token JWT
- **GET /api/auth/tutorial**: Retorna um vídeo tutorial

### Laboratórios (requer autenticação)
- **GET /api/laboratorios**: Lista todos os laboratórios
- **POST /api/laboratorios/novo**: Cadastra um novo laboratório
- **GET /api/laboratorios/relatorio**: Gera um relatório PDF
- **POST /api/laboratorios/bloquear/{lab}**: Bloqueia um laboratório específico

### Temperatura
- **GET /api/temperatura?temp=25.5**: Registra uma temperatura
- **GET /api/temperaturaAtual**: Retorna a última temperatura registrada

## Autenticação

Para acessar as rotas protegidas, você precisa:

1. Fazer login usando a rota `/api/auth/logar`
2. Copiar o token JWT retornado
3. Incluir o token no cabeçalho de autorização: `Authorization: Bearer seu_token_aqui`

## Modelos de Dados

### Usuário
```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
```

### Laboratório
```json
{
  "nome": "Laboratório de Informática 01",
  "descricao": "Laboratório com 20 computadores",
  "capacidade": 20,
  "bloqueado": false,
  "foto": "caminho/para/foto.jpg"
}
```