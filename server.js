require ('dotenv').config(); //Carrega as variáveis do arquivo .env 
// para o process.env
const express = require('express');
const app = express();
// rota ou endpoint // request, response

app.get('/ping', (req, res) => {
    return res.json({message:'ping pong'});
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    //console.log('Servidor rodando em... http://localhost:3000')
    console.log('Servidor rodando em... http://localhost:${PORT}')
})