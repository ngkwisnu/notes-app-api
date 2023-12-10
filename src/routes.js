const { addNotesHandler, getAllNotesHandler, getNotesByIdHandler, editNoteById, deleteNoteById } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteById,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteById,
    },
];

module.exports = routes;