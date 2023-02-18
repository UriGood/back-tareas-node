import { Request, Response } from 'express'
import Tarea from '../models/tarea';
import  generarjwt  from "../helpers/generar-jwt";


const bcryptjs = require('bcryptjs');

export const getTareas = async(req: Request, res: Response) => {
    const tareas = await Tarea.findAll();
    res.json(tareas);
}

export const getTarea = async (req: Request, res: Response) => {
    const { id } = req.params
    const tarea = await Tarea.findByPk(id);

    if (tarea) {
        res.json(tarea)
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
}

export const postTarea = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const tarea = new Tarea(body);
        await tarea.save()
        res.json(tarea);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putTarea = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req
    try {
        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.json({
                msg: "No existe la tarea con el id " + id
            })
        }
        await tarea.update(body);
        res.json(tarea)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteTarea = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const tarea = await Tarea.findByPk(id);
        if (!tarea) {
            return res.json({
                msg: "No existe el usuario con el id " + id
            })
        }
        await tarea.destroy();

        res.json(tarea)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}