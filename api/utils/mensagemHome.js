// utils/homeMessage.js

const mensagemHome = `
<h2>👋 Bem-vindo à API de Gerenciamento de Salas e Laboratórios!</h2>
<p>Esta API permite o cadastro de usuários, gerenciamento de laboratórios com imagens e geração de relatórios em PDF.</p>

<h3>📚 Rotas disponíveis:</h3>
<h4>📘 Autenticação</h4>
<ul>
  <li><strong>POST /api/auth/cadastrar</strong><br>
    <em>Body JSON:</em>
    <pre>{
  "nome": "João da Silva",
  "email": "joao@email.com",
  "senha": "123456"
}</pre>
  </li>
  <li><strong>POST /api/auth/logar</strong><br>
    <em>Body JSON:</em>
    <pre>{
  "email": "joao@email.com",
  "senha": "123456"
}</pre>
    <p>Retorna um token JWT para acessar rotas protegidas.</p>
  </li>
</ul>

<h4>🧪 Laboratórios</h4>
<ul>
  <li><strong>POST /api/laboratorios/novo</strong><br>
    <em>Headers:</em> Authorization: Bearer {token}<br>
    <em>Body (form-data):</em><br>
    - nome: Laboratório de Informática<br>
    - descricao: Computadores para aulas práticas<br>
    - capacidade: 30<br>
    - foto: (arquivo de imagem)
  </li>

  <li><strong>GET /api/laboratorios</strong><br>
    Lista todos os laboratórios cadastrados.
  </li>

  <li><strong>GET /api/laboratorios/relatorio</strong><br>
    Retorna um arquivo PDF com os dados dos laboratórios (incluindo imagens).
  </li>
</ul>

<h3>⏱️ Middleware de Dias Úteis</h3>
<p>⚠️ As requisições à API só são aceitas em dias úteis (segunda a sexta). Fora desses dias, o acesso é bloqueado.</p>
`;

module.exports = mensagemHome;
