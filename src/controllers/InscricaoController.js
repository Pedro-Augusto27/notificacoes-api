const InscricaoModel = require("../models/InscricaoModel");
const { AppError, NotFoundError, ValidationError } = require("../errors/AppError");

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
    try {
        const { eventoId, participanteId } = req.body;

        if (!eventoId || !participanteId) {
            throw new ValidationError("eventoId e participanteId são obrigatórios");
        }

        const resultado = InscricaoModel.criar(
            parseInt(eventoId),
            parseInt(participanteId),
        );

        if (resultado.erro) {
            throw new ValidationError(resultado.erro);
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
            throw new NotFoundError("Inscrição");
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