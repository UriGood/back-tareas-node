"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
// const jwt = require('jsonwebtoken');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
// const Usuario = require('../models/usuario');
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // console.log("res: ",res)
    if (((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[0]) !== 'token') {
        return res.status(401).json({
            msg: 'no hay token en la petición'
        });
    }
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = yield usuario_1.default.findOne({
            where: {
                id: uid
            }
        });
        ;
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
        console.log("Exito");
        req.body.Usuario = usuario;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
});
exports.validarJWT = validarJWT;
exports.default = exports.validarJWT;
//# sourceMappingURL=validar-jwt.js.map