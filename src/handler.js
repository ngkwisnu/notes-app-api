const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNotesHandler = (request, h) => {
    const {title, tags, body} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, 
        tags, 
        body,
        id,
        createdAt,
        updatedAt,
    }

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil Ditambahkan!',
            data: {
                noteId: id,
            },
        });

        response.code(201);
        response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com/');
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Ditambahkan!',
    });

    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNotesByIdHandler = (request, h) => {
    const { id } = request.params;

    // mencari notes dengan id
    const note = notes.filter((n) => n.id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Tidak Ditemukan!'
    })
    response.code(404);
    return response;
}

const editNoteById = (request, h) => {
    const {id} = request.params;

    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil Diperbaharui!',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Diperbaharui, Id Tidak Ditemukan!',
    });
    response.code(404);
    return response;
};

const deleteNoteById = (request, h) => {
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil Dihapus!',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Dihapus, Id Tidak Ditemukan!',
    });
    response.code(404);
    return response;
}

module.exports = { addNotesHandler, getAllNotesHandler, getNotesByIdHandler, editNoteById, deleteNoteById };