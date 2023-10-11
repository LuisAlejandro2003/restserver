const { response , request } = require('express');

const usuariosGet = (req = request, res = response) => {
   

    res.json({
        msg: ' get api - controller '
    });
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put api - controller',
        id
    });
}

const usuariosPost = (req, res) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'Post api - controller',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete api - controller'
    });
}
module.exports = {
    usuariosGet, usuariosPut, usuariosPost, usuariosDelete
}