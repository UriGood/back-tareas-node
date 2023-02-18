// const { response, request } = require('express');
import { Response, Request } from 'express';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';
// const Usuario = require('../models/usuario');

export const validarJWT = async(req:Request, res:Response, next:any) =>{
    
    // console.log("res: ",res)
    if (req.headers.authorization?.split(' ')[0] !== 'token') {
        return res.status(401).json({
            msg: 'no hay token en la petición'
        });
    }
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY as string);
        
        const usuario = await Usuario.findOne({
            where: {
                id: uid
            }
        });;

        //verificamos que usuario exista
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }

        //verificamos el status en true

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido -usuario con estado: false'
            });
        }
        console.log("Exito")
        req.body.Usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
        
    }


}

export default validarJWT;
