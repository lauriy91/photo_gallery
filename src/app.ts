import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// Para manejar sesiones y guardar la info del usuario cuando esté autenticado
import session, { Session } from "express-session";
import { join } from "path";
import mongoose from "mongoose";

// importación de las rutas
import {router as homeRouter} from "./routes/login.route";

declare module "express-session" {
    interface Session {
      user: IUser;
    }
}

export const app = express();

// para habilitar las variables de entorno
dotenv.config();

// para hacer llamados a recursos publicos
app.use(express.static(join(__dirname, "../", "public")));
app.use(express.urlencoded({ extended: false }));
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
      secret: "ssshhhhh",
      saveUninitialized: true,
      resave: true,
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
    console.log("Conectado a Mongo DB...");
})();

// Indicación para direccionar a home
app.use(homeRouter);

// Preparamos entorno "/" para la ruta, req los requerimiento y resp las respuestas
app.get("/", (req: Request, res: Response) => {
    res.render("index");
});

app.use(function (req, res, next) {
    res.render("error/404");
});

// Puerto de escucha
app.listen(3000, () => {
    console.log("Connection successful...");
});