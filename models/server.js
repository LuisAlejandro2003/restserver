var cors = require('cors')
const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath='/api/user';
        //middlewares
        this.middlewares();
        //rutas
        this.routes();
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

        this.app.use(this.usuariosPath, require ('../routes/user'))

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto ', this.port);
        })

    }
}

module.exports = Server;