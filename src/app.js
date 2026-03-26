const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// Middlewares genéricos (antes das rotas)
app.use(express.json());
app.use(cors());

const responseTime = require("./middlewares/responseTime");
app.use(responseTime);

const logger = require("./middlewares/logger");
app.use(logger);

// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
            inscricoes: "/inscricoes",
            documentacao: "/api-docs",
        },
    });
});

// Middleware de rota não encontrada (deve ser registrado após todas as rotas)
const notFound = require("./middlewares/notFound");
app.use(notFound);

// Middleware de tratamento centralizado de erros (último)
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;