const express = require('express');
const path = require('path');
const alunoRoutes = require('./src/routes/alunoRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'views')));
app.use('/', alunoRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
