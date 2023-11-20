const { Schema, model } = require('mongoose');

const DataSchema = Schema({

    idUser: {
        type: String,
        required: [true, 'El id del usuario es obligatorio'],
    },

    fecha: {
        type: String,
        
    },


    temperatura: {
        type: String,
        required: [true, 'La temperatura es obligatoria']
    },

    humedad: {
        type: String,
        required: [true, 'La humedad es obligatoria'],
    },

    luxes: {
        type: String,
        required: [true, 'La cantidad de luxes es obligatoria'],
    },

    hora: {
        type: String,
        required: [true, 'La hora es obligatoria'],
    }
});



module.exports = model('Data', DataSchema);