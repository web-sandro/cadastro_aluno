const path = require('path');
const fs = require('fs').promises;  // usando versão Promise para async/await
const alunoModel = require('../models/alunoModel');

async function mostrarCadastro(req, res) {
  // Apenas serve o formulário de cadastro (index.html)
  const filePath = path.join(__dirname, '..', 'views', 'index.html');
  const html = await fs.readFile(filePath, 'utf8');
  res.send(html);
}

async function listarAlunos(req, res) {
  try {
    const alunos = await alunoModel.listarAlunos();

    let listaHtml = '';
    alunos.forEach(a => {
      listaHtml += `<li>${a.nome} - ${a.serie} 
        <a href="/editar/${a.id}">Editar</a> | 
        <a href="/deletar/${a.id}">Excluir</a>
      </li>`;
    });

    const filePath = path.join(__dirname, '..', 'views', 'listar.html');
    let html = await fs.readFile(filePath, 'utf8');

    console.log('Arquivo HTML original:');
    console.log(html.slice(0, 200)); // Mostra os primeiros 200 chars do HTML lido

    html = html.replace('%LISTA_ALUNOS%', listaHtml);

    console.log('HTML depois da substituição:');
    console.log(html.slice(0, 200)); // Mostra os primeiros 200 chars do HTML modificado

    res.send(html);

  } catch (error) {
    console.error('Erro na função listarAlunos:', error);
    res.status(500).send('Erro no servidor');
  }
}

async function cadastrarAluno(req, res) {
  const { nome, serie } = req.body;
  await alunoModel.inserirAluno(nome, serie);
  res.redirect('/listar');
}

async function mostrarFormularioEdicao(req, res) {
  const { id } = req.params;
  const aluno = await alunoModel.buscarAlunoPorId(id);

  if (!aluno) {
    res.status(404).send('Aluno não encontrado');
    return;
  }

  const filePath = path.join(__dirname, '..', 'views', 'editar.html');
  let html = await fs.readFile(filePath, 'utf8');

  html = html
    .replace('%ID%', aluno.id)
    .replace('%NOME%', aluno.nome)
    .replace('%SERIE%', aluno.serie);

  res.send(html);
}

async function editarAluno(req, res) {
  const { id } = req.params;
  const { nome, serie } = req.body;

  await alunoModel.atualizarAluno(id, nome, serie);
  res.redirect('/listar');
}

async function mostrarConfirmacaoDelecao(req, res) {
  const { id } = req.params;
  const aluno = await alunoModel.buscarAlunoPorId(id);

  if (!aluno) {
    res.status(404).send('Aluno não encontrado');
    return;
  }

  const filePath = path.join(__dirname, '..', 'views', 'deletar.html');
  let html = await fs.readFile(filePath, 'utf8');

  html = html
    .replace(/%ID%/g, aluno.id)
    .replace(/%NOME%/g, aluno.nome)
    .replace(/%SERIE%/g, aluno.serie);

  res.send(html);
}

async function deletarAluno(req, res) {
  const { id } = req.params;
  await alunoModel.deletarAluno(id);
  res.redirect('/listar');
}

module.exports = {
  mostrarCadastro,
  listarAlunos,
  cadastrarAluno,
  mostrarFormularioEdicao,
  editarAluno,
  mostrarConfirmacaoDelecao,
  deletarAluno
};
