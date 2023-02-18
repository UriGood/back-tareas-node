"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareas_1 = require("../controllers/tareas");
const validar_jwt_1 = __importDefault(require("../middleware/validar-jwt"));
const router = (0, express_1.Router)();
//Rutas de Tareas
router.get('/', [validar_jwt_1.default], tareas_1.getTareas);
router.get('/:id', [validar_jwt_1.default], tareas_1.getTarea);
router.post('/', [validar_jwt_1.default], tareas_1.postTarea);
router.put('/:id', [validar_jwt_1.default], tareas_1.putTarea);
router.delete('/:id', [validar_jwt_1.default], tareas_1.deleteTarea);
exports.default = router;
//# sourceMappingURL=tareas.js.map