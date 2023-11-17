const { response, request } = require('express');
const socketIo = require('socket.io-client');
const socket = socketIo('http://localhost:3001'); // Reemplaza 'tu-servidor-socket' con la URL de tu servidor de sockets
const { format, isToday } = require('date-fns');
const Data = require('../models/data.model');

const dataPost = async (req, res) => {
    const { idUser, temperatura, humedad, luxes, hora } = req.body;
    const fechaActual = new Date();
    // Formatear la fecha
    const fechaFormateada = fechaActual.toDateString();
    const data = new Data({ idUser, temperatura, humedad, luxes, hora, fecha: fechaActual });

    await data.save();
    socket.emit('nuevos-datos', data);
    res.json({
        data
    });

}

const dataGet = async (req = request, res = response) => {
    try {
        const datas = await Data.find();
        const total = datas.length;

        res.json({
            total,
            datas
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};


const dataEmit = async ( req = request, res = response) => {
 
        const { idUser, temperatura, humedad, luxes, hora } = req.body;
        const data = { idUser, temperatura, humedad, luxes, hora };

        // Emite los datos al evento 'nuevos-datos' del servidor socket
        socket.emit('nuevos-datos', data);

        res.json({ message: 'Datos recibidos y emitidos al cliente correctamente' });

 
}


const dataGrafic = async (req, res) => {
    try {
        // Obtén la fecha actual en el formato de tu campo de fecha
        const currentDate = format(new Date(), "EEE MMM dd yyyy HH:mm:ss 'GMT'xx (zzz)");

        // Obtiene los datos de la base de datos
        const allData = await Data.find();

        // Filtra los datos por la fecha actual
        const datas = allData.filter(data => isToday(new Date(data.fecha)));

        const total = datas.length;

        res.json({
            total,
            datas
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};




const probabilidadTemperature = async (req = request, res = response) => {
    try {
        // Ordena los datos por fecha y hora de manera descendente y toma los últimos 12
        const datas = await Data.find().sort({ fecha: -1 }).limit(12);

        // Filtra las temperaturas mayores a 35 grados
        const mayores35Temperatura = datas.filter((dato) => dato.temperatura > 35);

        // Filtra las temperaturas menores a 25 grados
        const menores25Temperatura = datas.filter((dato) => dato.temperatura < 25);

        // Calcula las probabilidades de temperatura
        const probabilidadMayor35Temperatura = (mayores35Temperatura.length / 12) * 100;
        const probabilidadMenor25Temperatura = (menores25Temperatura.length / 12) * 100;

        // Filtra las humedades mayores a 40%
        const mayores40Humedad = datas.filter((dato) => dato.humedad > 40);

        // Filtra las humedades menores a 30%
        const menores30Humedad = datas.filter((dato) => dato.humedad < 30);

        // Calcula las probabilidades de humedad
        const probabilidadMayor40Humedad = (mayores40Humedad.length / 12) * 100;
        const probabilidadMenor30Humedad = (menores30Humedad.length / 12) * 100;

        // Filtra los luxes mayores a 300
        const mayores300Luxes = datas.filter((dato) => dato.luxes > 300);

        // Filtra los luxes menores a 100
        const menores100Luxes = datas.filter((dato) => dato.luxes < 100);

        // Calcula las probabilidades de luxes
        const probabilidadMayor300Luxes = (mayores300Luxes.length / 12) * 100;
        const probabilidadMenor100Luxes = (menores100Luxes.length / 12) * 100;

        res.json({
            datas,
            probabilidadMayor35Temperatura,
            probabilidadMenor25Temperatura,
            probabilidadMayor40Humedad,
            probabilidadMenor30Humedad,
            probabilidadMayor300Luxes,
            probabilidadMenor100Luxes,
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};




module.exports = {
    dataPost, dataGet, probabilidadTemperature, dataGrafic , dataEmit
}