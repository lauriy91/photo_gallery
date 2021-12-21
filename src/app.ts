import express, { Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
// Para manejar sesiones y guardar la info del usuario cuando esté autenticado
import session, {Session} from "express-session";
import { join } from "path";
import mongoose from "mongoose";

export const app = express();

// para habilitar las variables de entorno
dotenv.config();

// para hacer llamados a recursos publicos
app.use(express.static(join(__dirname, "../", "public")));
// motor de template
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

// Para hacer uso de las cabeceras
app.use(express.json());
// 
app.use(cors());
// configuración de sesión
app.use(
    session({
        secret: "this is the secret",
        resave: false,
        saveUninitialized: false,
    })
);

// Conexión
const options: mongoose.ConnectOptions = {
    dbName: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    pass: process.env.DB_PASS as string,
};

// conexion a la base de datos
(async () => {
    await mongoose.connect(process.env.DB_CONNECTION as string, options);
    console.log("Conectado a Mongo DB ... ");
})();

// Preparamos entorno "/" para la ruta, req los requerimiento y resp las respuestas
app.get("/", (req: Request, res: Response) =>{
    res.send("Hola mundo");
});

// Puerto de escucha
app.listen(3000, () =>{
    console.log("Servidor en el puerto 3000");
});