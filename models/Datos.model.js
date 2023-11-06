const { Schema, model } = require('mongoose');

const DataSchema = Schema({

    temperatura: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    humedad: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    luxes: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],

    }
});



module.exports = model('Data', DataSchema);