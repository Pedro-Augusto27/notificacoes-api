const ParticipanteModel = require("../models/ParticipanteModel");
const { AppError, NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, minLength, isEmail, validar } = require("../helpers/validators");

// Get
function index(req, res, next) {
    try {
        const participantes = ParticipanteModel.listarTodos();
        res.json(participantes);
    } catch (err) {
        next(err);
    }
}

// Get
function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participante = ParticipanteModel.buscarPorId(id);

        if (!participante) {
            throw new NotFoundError("Participante");
        }

        res.json(participante);
    } catch (err) {
        next(err);
    }
}

// Post
function store(req, res, next) {
    try {
        const { nome, email } = req.body;

        const erros = validar([
            isRequired(nome, "Nome"),
            minLength(nome, 2, "Nome"),
            isRequired(email, "Email"),
            isEmail(email)
        ]);

        if (erros) {
            throw new ValidationError(erros.join("; "));
        }

        const novoParticipante = ParticipanteModel.criar({
            nome,
            email,
        });
        res.status(201).json(novoParticipante);
    } catch (err) {
        next(err);
    }
}

// Put
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);

        if (!participanteAtualizado) {
            throw new NotFoundError("Participante");
        }

        res.json(participanteAtualizado);
    } catch (err) {
        next(err);
    }
}

function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const deletado = ParticipanteModel.deletar(id);

        if (!deletado) {
            throw new NotFoundError("Participante");
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