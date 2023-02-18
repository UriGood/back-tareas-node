import { DataTypes } from "sequelize";
import db from '../db/connection';

const Tarea = db.define('Tarea',{
    nombre:{
        type: DataTypes.STRING
    },
    id_usuario:{
        type:DataTypes.STRING
    }
});

export default Tarea;