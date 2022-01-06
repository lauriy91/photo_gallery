//Importar mongoose
const mongoose = require('mongoose');

//Importar url de conexión a la BD
const database = require('./urlDatabase');


class DatabaseConnection {

    constructor() {
        
        mongoose.connect(database.db).then(() => {
            console.log("Conexión exitosa a la BD");
        }, error => {
            console.log(error);
        }).catch(error => {
            console.log(error);
        });
    }
}

//Exportamos DatabaseConnection
module.exports = DatabaseConnection;