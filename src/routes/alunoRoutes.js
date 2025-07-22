const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.mostrarCadastro);
router.post('/cadastrar', alunoController.cadastrarAluno);

router.get('/listar', alunoController.listarAlunos);

router.get('/editar/:id', alunoController.mostrarFormularioEdicao);
router.post('/editar/:id', alunoController.editarAluno);

router.get('/deletar/:id', alunoController.mostrarConfirmacaoDelecao);
router.post('/deletar/:id', alunoController.deletarAluno);

module.exports = router;
