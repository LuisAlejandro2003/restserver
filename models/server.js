var cors = require('cors')
const express = require('express');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/user';
        this.authPath = '/api/auth';
        this.dataPath = '/api/data'


        //conectar a la base de datos 
        this.conectarDB();
        //middlewares
        this.middlewares();


        //rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json())
        //directorio public
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/user'))
        this.app.use(this.dataPath, require('../routes/datos'))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto ', this.port);
        })

    }
}

module.exports = Server;