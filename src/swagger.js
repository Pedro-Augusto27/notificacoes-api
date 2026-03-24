const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info : {
            title: "Notificação API",
            version: "1.0.0",
            description:
            "API para módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos",
        },
        servers: [
            {
                url: "http://localhost:3000",
                discription: "Servidor de desenvolvimento",
            },
        ],
    },
    // Onde o Swagger vai procurar os comentários de documentação
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;