const { response, request } = require('express');
const socketIo = require('socket.io-client');
const socket = socketIo('http://socket2023.creativesolution.com.mx:3000'); // Reemplaza 'tu-servidor-socket' con la URL de tu servidor de sockets
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

const dataGet = async (req, res) => {
    try {


        const payload = req.usuario;
        const userId = payload._id;
        // Obtener datos de la base de datos filtrados por el userId
        const datas = await Data.find({ idUser: userId });

        // Ordenar los datos por fecha de forma descendente
        const datasOrdenados = datas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        // Calcular el total después de ordenar
        const total = datasOrdenados.length;

        res.json({
            total,
            datas: datasOrdenados,
        });
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
};


const dataEmit = async (req = request, res = response) => {

    const { idUser, temperatura, humedad, luxes, hora } = req.body;
    const data = { idUser, temperatura, humedad, luxes, hora };

    // Emite los datos al evento 'nuevos-datos' del servidor socket
    socket.emit('nuevos-datos', data);

    res.json({ message: 'Datos recibidos y emitidos al cliente correctamente' });


}


const dataGrafic = async (req, res) => {
    try {
        // Obtener el payload del token desde req.usuario
        const payload = req.usuario;

        // Extraer el userId del payload
        const userId = payload._id; // Asumiendo que el id del usuario está en la propiedad _id

        // Obtén la fecha actual en el formato de tu campo de fecha
        const currentDate = format(new Date(), "EEE MMM dd yyyy HH:mm:ss 'GMT'xx (zzz)");

        // Obtiene los datos de la base de datos filtrados por el userId
        const allData = await Data.find({ idUser: userId });

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
        const userId = req.usuario._id;

    
        const datas = await Data.find({ idUser: userId }).sort({ fecha: 1 }).limit(12);

        
        const mayores35Temperatura = datas.filter((dato) => dato.temperatura > 35);

        const menores25Temperatura = datas.filter((dato) => dato.temperatura < 25);

       
        const probabilidadMayor35Temperatura = (mayores35Temperatura.length / 12) * 100;
        const probabilidadMenor25Temperatura = (menores25Temperatura.length / 12) * 100;

        
        const mayores40Humedad = datas.filter((dato) => dato.humedad > 75);

        
        const menores30Humedad = datas.filter((dato) => dato.humedad < 55);

        const probabilidadMayor40Humedad = (mayores40Humedad.length / 12) * 100;
        const probabilidadMenor30Humedad = (menores30Humedad.length / 12) * 100;

    
        const mayores300Luxes = datas.filter((dato) => dato.luxes > 300);


        const menores100Luxes = datas.filter((dato) => dato.luxes < 100);

    
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



const mediaUltimos30Dias = async (req, res) => {
    try {
        // Obtener el userId del payload del token
        const userId = req.usuario._id;


        const datas = await Data.find({ idUser: userId })
            .sort({ fecha: -1 })
            .limit(30);

        
        if (datas.length === 0) {
            return res.json({
                mediaTemperatura: null,
                mediaHumedad: null,
                mediaLuxes: null,
            });
        }

    
        const mediaTemperatura = datas.reduce((acc, dato) => acc + parseFloat(dato.temperatura), 0) / datas.length;
        const mediaHumedad = datas.reduce((acc, dato) => acc + parseFloat(dato.humedad), 0) / datas.length;
        const mediaLuxes = datas.reduce((acc, dato) => acc + parseFloat(dato.luxes), 0) / datas.length;

        res.json({
            mediaTemperatura,
            mediaHumedad,
            mediaLuxes,
        });
    } catch (error) {
        console.error('Error al calcular la media:', error);
        res.status(500).json({ error: 'Error al calcular la media' });
    }
};





module.exports = {
    dataPost, dataGet, probabilidadTemperature, dataGrafic, dataEmit, mediaUltimos30Dias
}