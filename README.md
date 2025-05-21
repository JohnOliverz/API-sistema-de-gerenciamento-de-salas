
# Sistema de Gerenciamento de Salas

Este projeto consiste em uma API para gerenciamento de laboratórios acadêmicos, permitindo cadastro, listagem, upload de imagens, autenticação de usuários e geração de relatórios em PDF.

## 📌 Funcionalidades

- Cadastro e login de usuários com autenticação JWT.
- Cadastro de laboratórios com upload de imagem (padrão 1:1).
- Listagem de todos os laboratórios.
- Geração de relatório em PDF com os laboratórios cadastrados.
- Middleware para restringir o uso da API apenas a dias úteis.
- Armazenamento de imagens no Cloudinary.

## 🚀 Tecnologias Utilizadas

### Linguagens
- **JavaScript (Node.js)**

### Banco de Dados
- **MongoDB Atlas:** - Banco de dados em nuvem

### Hospedagem
- **Vercel:** - Deploy da API

### Frameworks e Bibliotecas
- **Express**  - Framework web
- **Mongoose**  - ODM para MongoDB
- **bcrypt**  - Criptografia de senhas
- **jsonwebtoken**  - Geração de token JWT
- **pdfkit**  - Geração de arquivos PDF
- **multer**  - Upload de arquivos
- **dotenv**  - Variáveis de ambiente
- **cloudinary** - Armazenamento de imagens
- **Jest** - Framework de testes unitários para JavaScript
- **Supertest** - Biblioteca para testar requisições HTTP em APIs Express


## 📁 Estrutura do Projeto

```
📦api-sistema-de-gerenciamento-de-salas
 ┣ 📂api
 ┃ ┣ 📂controllers
 ┃ ┣ 📂middlewares
 ┃ ┣ 📂models
 ┃ ┣ 📂routes
 ┃ ┣ 📂utils
 ┃ ┗ index.js
 ┣ vercel.json
 ┗ .env
```

## 🔐 Rotas da API

### 📘 Autenticação

#### `POST /api/auth/cadastrar`

```json
{
  "nome": "João da Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

#### `POST /api/auth/logar`

```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

> Retorna um token para acessar as demais rotas protegidas.

---

### 🧪 Laboratórios

#### `POST /api/laboratorios/novo`

**Headers:** Authorization: Bearer {token}

**Body (form-data):**

- `nome`: Laboratório de Informática
- `descricao`: Computadores para aulas práticas
- `capacidade`: 30
- `foto`: (arquivo de imagem)

#### `GET /api/laboratorios`

> Lista todos os laboratórios cadastrados.

#### `GET /api/laboratorios/relatorio`

> Retorna um arquivo PDF para download com os dados dos laboratórios cadastrados (com fotos).

## 📝 Observações

- Todas as rotas de laboratório exigem autenticação via JWT.
- A API só pode ser acessada de segunda a sexta-feira.
- O projeto está pronto para deploy na **Vercel** (com limitações de funções serverless no plano gratuito).

## 💻 Exemplo de Deploy

A API pode ser acessada após deploy no Vercel por meio da URL base:

```
https://api-sistema-de-gerenciamento-de-salas.vercel.app
```

## 📷 Imagens no Cloudinary

As imagens dos laboratórios são armazenadas no Cloudinary e a URL é salva no banco de dados MongoDB.

---


## 👥 Equipe
Desenvolvido com 💻 por Jhonatan Sousa, Jefferson Lucas, Gabriel Lopes e Gabriel Oliveira – IFCE Crato
