const EventoModel = require("../models/EventoModel");
const { AppError, NotFoundError, ValidationError } = require("../errors/AppError");

const {
    isRequired,
    isPositiveInteger,
    minLength,
    validar,
} = require("../helpers/validators");
const { NotFoundError, ValidationError } = require("../errors/AppError");

function store(req, res, next) {
    try {
        const { nome, descricao, data, local, capacidade } = req.body;
        // Validar os dados de entrada
        const erros = validar([
            isRequired(nome, "Nome"),
            isRequired(data, "Data"),
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);
        if (erros) {
            throw new ValidationError(erros.join("; "));
        }
        const novoEvento = EventoModel.criar({
            nome,
            descricao,
            data,
            local,
            capacidade,
        });
        res.status(201).json(novoEvento);
    } catch (erro) {
        next(erro);
    }
}


function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const { nome, capacidade } = req.body;
        // No update, os campos não são obrigatórios (atualização parcial)
        // Mas SE forem enviados, devem ser válidos
        const erros = validar([
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);
        if (erros) {
            throw new ValidationError(erros.join("; "));
        }
        const eventoAtualizado = EventoModel.atualizar(id, req.body);
        if (!eventoAtualizado) {
            throw new NotFoundError("Evento");
        }
        res.json(eventoAtualizado);
    } catch (erro) {
        next(erro);
    }
}

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

        if (!evento) {
            throw new NotFoundError("Evento");
        }

        res.json(evento);
    } catch (err) {
        next(err);
    }
}

// POST - /eventos - criar novo
function store(req, res, next) {
    try {
        const { nome, descricao, data, local, capacidade } = req.body;

        const erros = validar([
            isRequired(nome, "Nome"),
            isRequired(data, "Data"),
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);

        if (erros) {
            throw new ValidationError(erros.join("; "));
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
        const { nome, capacidade } = req.body;

        const erros = validar([
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);

        if (erros) {
            throw new ValidationError(erros.join("; "));
        }

        const eventoAtualizado = EventoModel.atualizar(id, req.body);

        if (!eventoAtualizado) {
            throw new NotFoundError("Evento");
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
            throw new NotFoundError("Evento");
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