const db = require('../database');

async function inserirAluno(nome, serie) {
  const [result] = await db.execute(
    'INSERT INTO alunos (nome, serie) VALUES (?, ?)',
    [nome, serie]
  );
  return result;
}

async function listarAlunos() {
  const [rows] = await db.query('SELECT * FROM alunos ORDER BY id DESC');
  return rows;
}

async function buscarAlunoPorId(id) {
  const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);
  return rows[0];
}

async function atualizarAluno(id, nome, serie) {
  const [result] = await db.execute(
    'UPDATE alunos SET nome = ?, serie = ? WHERE id = ?',
    [nome, serie, id]
  );
  return result;
}

async function deletarAluno(id) {
  const [result] = await db.execute('DELETE FROM alunos WHERE id = ?', [id]);
  return result;
}

module.exports = {
  inserirAluno,
  listarAlunos,
  buscarAlunoPorId,
  atualizarAluno,
  deletarAluno
};
