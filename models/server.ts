import express, { Application } from 'express'
import userRoutes from '../routes/usuario'
import tareaRoutes from '../routes/tareas'
import cors from 'cors'
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        tareas: '/api/tareas'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        //definir mis rutas
        this.routes();
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.tareas, tareaRoutes);
    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        }
        catch(error){
            // throw new Error( error );
            
        }
    }
    middlewares() {
        //cors
        this.app.use(cors());

        //LECTURA DEL BODY
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puertooo ' + this.port);
        })
    }
}

export default Server;