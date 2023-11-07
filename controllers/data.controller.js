const { response, request } = require('express');
const Data = require('../models/data.model');

const dataPost = async (req, res) => {

    const { idUser, temperatura, humedad, luxes, hora } = req.body;
    const data = new Data({ idUser, temperatura, humedad, luxes, hora });

    //guardar en db
    await data.save();
    res.json({
        data
    });

}

module.exports = {
    dataPost
}