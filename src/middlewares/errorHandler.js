const AppError = require("../errors/AppError");

function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ erro: err.message });
    }

    console.error(err);
    res.status(500).json({ erro: "Erro interno do servidor" });
}

module.exports = errorHandler;
