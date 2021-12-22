import express, { NextFunction, Request, Response } from "express";
import User from "../model/user.model";

export const router = express.Router();

// Interfaz para que el usuario se loguee
router.get("/login", (req: Request, res: Response) =>{
    res.render("login/index");
});

// Interfaz para crear un nuevo usuario
router.get("/signup", (req: Request, res: Response) => {
    res.render("login/signup");
});

// Interfaz para autenticarse
router.post("/auth", (req: Request, res: Response, next: NextFunction) => {});

// Interfaz para crear un nuevo usuario
router.post("/register", 
    async (req: Request, res: Response, next: NextFunction)=>{
        // extraer componentes y enviar en el submit la información
        const {
            username, 
            password, 
            name,
        }: {username: string, password: string, name: string}= req.body;
        // validación del usuario si algún campo le falta
        if(!username || !password || !name){
           console.log("falta un campo");
           res.redirect("/signup");
        }
        // Si todo se encuentra ok crea el objeto usuario
        else{
            const userProps = {username, password, name};
            const user = new User(userProps);

            // si existe el usuario...
            const exists = await user.usernameExists(username);

            if (exists) res.redirect("/signup");

            await user.save();

            res.redirect("/login");
        }
    }
);