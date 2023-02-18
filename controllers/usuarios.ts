import { Request, Response } from 'express'
import Usuario from '../models/usuario';
import  generarjwt  from "../helpers/generar-jwt";


const bcryptjs = require('bcryptjs');

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll()
    res.json(usuarios);
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    const { password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el emaiil ' + body.email
            })
        }
        const salt = bcryptjs.genSaltSync(10);
        body.password = bcryptjs.hashSync(password, salt);
        const usuario = new Usuario(body);
        await usuario.save()
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.json({
                msg: "No existe el usuario con el id " + id
            })
        }
        await usuario.update(body);
        res.json(usuario)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.json({
                msg: "No existe el usuario con el id " + id
            })
        }
        await usuario.destroy();

        res.json(usuario)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export const login = async (req:Request, res:Response) => {

    const { body } = req;

    const { email, password } = req.body;

    try {
        //verificar si el email existe
         const usuario = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -estado: false'
            });
        }
        //verificar la contraseña
        const validPassword = await bcryptjs.compare(password, usuario.password);
        console.log(validPassword);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -estado: password'
            });
        }
        // generar el jwt
        const token = await generarjwt(usuario.id);


        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error comuniquese con soporte'
        });
    }
}


