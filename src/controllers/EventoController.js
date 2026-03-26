const EventoModel = require("../models/EventoModel");
const AppError = require("../errors/AppError");

// GET - /eventos - listar todos
function index(req, res, next) {
    try {
        const eventos = EventoModel.listarTodos();
        res.json(eventos);
    } catch (err) {
        next(err);
    }
}

// GET - /eventos/:id - buscar por ID
function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const evento = EventoModel.buscarPorId(id);

        if (!evento) throw new AppError("Evento não encontrado", 404);

        res.json(evento);
    } catch (err) {
        next(err);
    }
}

// POST - /eventos - criar novo
function store(req, res, next) {
    try {
        const { nome, descricao, data, local, capacidade } = req.body;

        if (!nome || !data) {
            throw new AppError("Nome e data são obrigatórios", 400);
        }

        const novoEvento = EventoModel.criar({
            nome,
            descricao,
            data,
            local,
            capacidade,
        });

        res.status(201).json(novoEvento);
    } catch (err) {
        next(err);
    }
}

// PUT - /eventos/:id - atualizar
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const eventoAtualizado = EventoModel.atualizar(id, req.body);

        if (!eventoAtualizado) {
            throw new AppError("Evento não encontrado", 404);
        }

        res.json(eventoAtualizado);
    } catch (err) {
        next(err);
    }
}

// DELETE /eventos/:id — deletar
function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const deletado = EventoModel.deletar(id);

        if (!deletado) {
            throw new AppError("Evento não encontrado", 404);
        }

        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};