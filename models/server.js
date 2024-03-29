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


        this.conectarDB();
        this.middlewares();


        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors());
        this.app.use(express.json())
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