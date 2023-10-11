const Server = require('./models/server');

require('dotenv').config();

// instancia de la clase
const server = new Server();

//metodo que levanta el server
server.listen();



