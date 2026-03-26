const InscricaoModel = require("../models/InscricaoModel");
const AppError = require("../errors/AppError");

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
    try {
        const { eventoId, participanteId } = req.body;

        if (!eventoId || !participanteId) {
            throw new AppError("eventoId e participanteId são obrigatórios", 400);
        }

        const resultado = InscricaoModel.criar(
            parseInt(eventoId),
            parseInt(participanteId),
        );

        if (resultado.erro) {
            throw new AppError(resultado.erro, 400);
        }

        res.status(201).json(resultado);
    } catch (err) {
        next(err);
    }
}

// GET /inscricoes — listar todas
function index(req, res, next) {
    try {
        const inscricoes = InscricaoModel.listarTodas();
        res.json(inscricoes);
    } catch (err) {
        next(err);
    }
}

// GET /inscricoes/evento/:eventoId — listar inscrições de um evento
function listarPorEvento(req, res, next) {
    try {
        const eventoId = parseInt(req.params.eventoId);
        const inscricoes = InscricaoModel.listarPorEvento(eventoId);
        res.json(inscricoes);
    } catch (err) {
        next(err);
    }
}

// PATCH /inscricoes/:id/cancelar — cancelar uma inscrição
function cancelar(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const resultado = InscricaoModel.cancelar(id);

        if (!resultado) {
            throw new AppError("Inscrição não encontrada", 404);
        }

        res.json(resultado);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    store,
    index,
    listarPorEvento,
    cancelar,
};