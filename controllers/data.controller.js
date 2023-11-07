const { response, request } = require('express');
const socketIo = require('socket.io-client');
const socket = socketIo('http://localhost:3001'); // Reemplaza 'tu-servidor-socket' con la URL de tu servidor de sockets

const Data = require('../models/data.model');

const dataPost = async (req, res) => {

    const { idUser, temperatura, humedad, luxes, hora } = req.body;
    const data = new Data({ idUser, temperatura, humedad, luxes, hora });

    //guardar en db
    await data.save();

    socket.emit('nuevos-datos', data);


    res.json({
        data
    });

}

module.exports = {
    dataPost
}