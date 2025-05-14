const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 


const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


function extrairMatricula(email) {
  const regex = /^([a-zA-Z0-9]+)@pucgo\.edu\.br$/;
  const match = email.match(regex);
  return match ? match[1] : null;
}


app.post('/identificarUsuario', async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'Email não fornecido' });
  }

  const matricula = extrairMatricula(email);
  if (!matricula) {
    return res.status(400).json({ error: 'Formato de email inválido' });
  }

  try {
    const doc = await db.collection('alunos').doc(matricula).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const dados = doc.data();
    return res.status(200).json({
      matricula: matricula,
      tipo: dados.tipo,
      nome: dados.nome,
    });
  } catch (error) {
    console.error('Erro ao consultar Firestore:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
