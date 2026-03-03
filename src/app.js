const express = require("express");
const app = express();

// Middleware para ler JSON no body das requisições
app.use(express.json());

// Rota de teste. (Remover depois)
app.get("/", (req, res) => {
    res.json({ mensagem: "API de Notificações funcionando!"});
});

module.exports = app;